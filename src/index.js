import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { hostname } from "node:os";
import fs from "node:fs";
import path from "node:path";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";

import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const publicPath = fileURLToPath(new URL("../public/", import.meta.url));
const rootPath = fileURLToPath(new URL("../", import.meta.url));

// Set your bypass password here
const ADMIN_PASSWORD = "Blackwell706";

// Wisp Configuration: Refer to the documentation at https://www.npmjs.com/package/@mercuryworkshop/wisp-js

logging.set_level(logging.NONE);

// Server-side ad, tracker, and telemetry blacklist
// Server-side comprehensive ad, tracker, and analytics blacklist
const adBlacklist = [
    // Google Ads & Analytics
    /.*googlesyndication\.com/,
    /.*googleadservices\.com/,
    /.*adservice\.google\.com/,
    /.*google-analytics\.com/,
    /.*googletagmanager\.com/,

    // DoubleClick & Amazon Ads
    /.*doubleclick\.net/,
    /.*\.s3\.amazonaws\.com/, // Catches adtago.s3, analyticsengine.s3, etc.

    // Popular Ad Networks (Adcolony, Media.net, Criteo, etc.)
    /.*adcolony\.com/,
    /.*media\.net/,
    /.*adnxs\.com/,
    /.*criteo\.com/,
    /.*amazon-adsystem\.com/,
    /.*taboola\.com/,
    /.*outbrain\.com/,

    // Analytics & Heatmaps (Hotjar, Mouseflow, LuckyOrange, FreshWorks)
    /.*hotjar\.com/,
    /.*hotjar\.io/,
    /.*mouseflow\.com/,
    /.*freshmarketer\.com/,
    /.*luckyorange\.com/,
    /.*scorecardresearch\.com/
];

Object.assign(wisp.options, {
    allow_udp_streams: false,
    hostname_blacklist: adBlacklist,
    dns_servers: ["1.1.1.3", "1.0.0.3"],
});

const fastify = Fastify({
    serverFactory: (handler) => {
        return createServer()
            .on("request", (req, res) => {
                res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                handler(req, res);
            })
            .on("upgrade", (req, socket, head) => {
                if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
                else socket.end();
            });
    },
});

fastify.register(fastifyStatic, {
    root: publicPath,
    decorateReply: true,
});

fastify.register(fastifyStatic, {
    root: scramjetPath,
    prefix: "/scram/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: libcurlPath,
    prefix: "/libcurl/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: baremuxPath,
    prefix: "/baremux/",
    decorateReply: false,
});

fastify.post('/unlock', async (req, reply) => {
    const body = req.body || {};
    const password = body.password || '';

    if (password === ADMIN_PASSWORD) {
        reply.header(
            'Set-Cookie',
            `lockdown_auth=${ADMIN_PASSWORD}; Path=/; SameSite=Lax; Max-Age=600`
        );
        return reply.code(200).send({ ok: true });
    }

    return reply.code(401).send({ ok: false });
});

// ── GLOBAL LOCKDOWN HOOK ──
fastify.addHook("onRequest", async (req, reply) => {
    // 1. KILL THE CACHE: Force the browser to check the server every single time
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    reply.header('Pragma', 'no-cache');
    reply.header('Expires', '0');

    const isLocked = fs.existsSync(path.join(rootPath, "LOCKDOWN"));

    if (isLocked) {
        // 2. Allow essential proxy bundles & Wisp socket endpoints to pass through
        if (
            req.url.startsWith("/scram/") ||
            req.url.startsWith("/libcurl/") ||
            req.url.startsWith("/baremux/") ||
            req.url.endsWith("/wisp/") ||
            req.url.startsWith("/index-lockdown.html") ||
            req.url.startsWith("/unlock")
        ) {
            return;
        }

        // 3. Check cookie / auth state
        const cookies = req.headers.cookie || "";
        const hasAuthCookie = cookies.includes(`lockdown_auth=${ADMIN_PASSWORD}`);

        // 4. Authorized cookie -> authenticated
        if (hasAuthCookie) {
            // Set cookie with Max-Age so it self-destructs (600 seconds = 10 minutes)
            reply.header(
                "Set-Cookie",
                `lockdown_auth=${ADMIN_PASSWORD}; Path=/; SameSite=Lax; Max-Age=600`
            );
            return;
        }

        // 5. Unauthenticated -> serve lockdown screen
        return reply.type("text/html").sendFile("index-lockdown.html");
    }
});

fastify.setNotFoundHandler((res, reply) => {
    return reply.code(404).type("text/html").sendFile("404.html");
});

fastify.server.on("listening", () => {
    const address = fastify.server.address();

    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${
            address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    fastify.close();
    process.exit(0);
}

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

fastify.listen({
    port: port,
    host: "0.0.0.0",
});