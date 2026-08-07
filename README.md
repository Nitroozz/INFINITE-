<img width="599" height="114" alt="Screenshot 2026-08-06 120029" src="https://github.com/user-attachments/assets/3ea4a38a-b114-44b0-8ae6-38fa0663d31b" />


<h1 align="center">INFINITE</h1>

A web proxy used to avoid internet filtering on any device. This project is a custom implementation based on <a href="https://github.com/MercuryWorkshop/scramjet">Scramjet</a> by Mercury Workshop, designed with security, developer friendliness, and performance in mind.

## Supported Sites

Scramjet has CAPTCHA support! Some popular websites supported include:

- [Google](https://google.com)
- [Twitter](https://twitter.com)
- [Instagram](https://instagram.com)
- [Youtube](https://youtube.com)
- [Spotify](https://spotify.com)
- [Discord](https://discord.com)
- [Reddit](https://reddit.com)
- [GeForce NOW](https://play.geforcenow.com/)

*Note: Ensure you are not hosting on a datacenter IP for CAPTCHAs to work reliably along with YouTube.*

## Setup / Usage

You will need Node.js 18+ and Git installed. Below is an example setup for Debian/Ubuntu:

```bash
sudo apt update
sudo apt upgrade
sudo apt install curl git nginx

curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20

git clone [https://github.com/Nitroozz/INFINITE-.git](https://github.com/Nitroozz/INFINITE-.git)
cd INFINITE-
