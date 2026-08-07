<h1 align="center">INFINITE</h1>

<p align="center">
  <img width="599" height="114" alt="INFINITE Header" src="https://github.com/user-attachments/assets/3ea4a38a-b114-44b0-8ae6-38fa0663d31b" />
</p>

A web proxy used to avoid internet filtering on any device. This project is a custom implementation based on <a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a> by Mercury Workshop, designed with security, developer friendliness, and performance in mind.

## Custom Lockdown Feature

Inside the `public/` directory, there are two index files: the main `index.html` and `index-lockdown.html`. 

You have the option to lock down access to the site. When locked, users are redirected to the lockdown landing page until authenticated. The authentication password and lockdown logic are configured inside `src/index.js`.

<img width="2546" height="1255" alt="Lockdown Feature Screenshot" src="https://github.com/user-attachments/assets/a0cd7573-242e-4b3f-994c-3ff58957c652" />

## Supported Sites

Scramjet includes CAPTCHA support! Some popular supported websites include:

- [Google](https://google.com)
- [Twitter](https://twitter.com)
- [Instagram](https://instagram.com)
- [YouTube](https://youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)

*Note: Ensure you are not hosting on a datacenter IP for CAPTCHAs and YouTube streaming to work reliably.*

## Setup / Usage

You will need **Node.js 18+** and **Git** installed. Below is an example setup for Debian/Ubuntu:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx

curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20

git clone [https://github.com/Nitroozz/INFINITE-.git](https://github.com/Nitroozz/INFINITE-.git)
cd INFINITE-
pnpm install # or npm install
pnpm start   # or npm start
