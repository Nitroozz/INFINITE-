<h1 align="center">INFINITE</h1>

<p align="center">
  <img width="599" height="114" alt="INFINITE Header" src="https://github.com/user-attachments/assets/3ea4a38a-b114-44b0-8ae6-38fa0663d31b" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-custom-lockdown-feature">Lockdown Feature</a> •
  <a href="#-supported-sites">Supported Sites</a> •
  <a href="#-setup--usage">Setup & Usage</a> •
  <a href="#-credits--acknowledgments">Credits</a>
</p>

---

## 📌 Overview

**INFINITE** is a web proxy used to avoid internet filtering on any device, optimized for Chromebooks and restricted environments. 

This project is a custom implementation based on <a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a> by **Mercury Workshop**, designed with security, developer-friendliness, and performance in mind. By utilizing client-side JavaScript/HTML rewriting and **Wisp** for low-latency WebSocket transport, INFINITE can handle complex modern web applications, media streaming, and 3D WebGL assets.

---

## 🔒 Custom Lockdown Feature

Inside the `public/` directory, there are two index files: the main `index.html` and `index-lockdown.html`. 

You have the option to lock down access to the site. When locked, users are redirected to the lockdown landing page until authenticated. The authentication password and lockdown logic are configured inside `src/index.js`.

<p align="center">
  <img width="100%" alt="Lockdown Feature Screenshot" src="https://github.com/user-attachments/assets/a0cd7573-242e-4b3f-994c-3ff58957c652" />
</p>

---

## 🌐 Supported Sites

Scramjet includes CAPTCHA support! Some popular supported websites tested and working on INFINITE include:

- [Google](https://google.com)
- [X (Twitter)](https://twitter.com)
- [Instagram](https://instagram.com)
- [YouTube](https://youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)

> **Note:** Ensure you are not hosting on a flagged datacenter IP for CAPTCHAs and YouTube streaming to work reliably.

---

## 🛠️ Setup / Usage

You will need **Node.js 18+** and **Git** installed. Below is an example setup for Debian/Ubuntu environments:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx

# Install NVM
curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install & Use Node 20
nvm install 20
nvm use 20

# Clone Repository
git clone [https://github.com/Nitroozz/INFINITE-.git](https://github.com/Nitroozz/INFINITE-.git)
cd INFINITE-

# Install & Start
pnpm install # or npm install
pnpm start   # or npm start
