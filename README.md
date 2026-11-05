# Naduni & Ushan — Wedding Invitation

A responsive ivory-and-gold wedding invitation website.

## Wedding
- **Date:** 10 December 2026
- **Venue:** Earl's Court, Cinnamon Lakeside, Colombo
- **Guest links:** Open `create-guest-links.html` after GitHub Pages is enabled.
- **RSVP:** WhatsApp-based; no Google Sheets backend.
- **Music:** `assets/wedding-song.mp3` contains the original song's 1:35–2:10 excerpt. Clicking the red wax seal opens the invitation and plays this 35-second clip on repeat. The header music button pauses/resumes playback; no YouTube player is loaded.

## Send invitations to different guests

Open https://naduni-ushan-wedding.github.io/create-guest-links.html, enter one guest or family name per line, and choose **Generate invitation links**. Send each person only the link listed beneath their name. There is one shared website; each guest link changes the greeting and prefills the RSVP name for that visitor. Old encoded guest links continue to work.

You can also make a link directly:

- Chandrika Sajeewani: `https://naduni-ushan-wedding.github.io/?guest=Chandrika%20Sajeewani`
- Nimal Perera: `https://naduni-ushan-wedding.github.io/?guest=Nimal%20Perera`

Change `defaultGuestName` near the top of `script.js` only to change the main link's default greeting. Set it to `''` for the general greeting. Personalised links override the default, so you do not need to edit or publish code for each guest. Changing the name in `index.html` alone does not override JavaScript personalisation.

## Deployment

The invitation's organization is `Naduni-Ushan-Wedding`. Its GitHub Pages repository is `Naduni-Ushan-Wedding/naduni-ushan-wedding.github.io`, with the public invitation address `https://naduni-ushan-wedding.github.io/` once Pages deployment completes. Personalised links are generated at `https://naduni-ushan-wedding.github.io/create-guest-links.html`.
Enable **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.

After deployment, find the published website address under **Settings → Pages**.
To use an address that does not contain a GitHub account name, configure a custom domain in the same Pages settings.

## Free address without a GitHub username

This static site can also be hosted on Netlify with a free `netlify.app` address.

1. Sign in to your Netlify account and open https://app.netlify.com/drop.
2. Upload the prepared `naduni-and-ushan-netlify.zip` package from the parent folder, or drag in the site folder containing `index.html`, `styles.css`, `script.js`, `create-guest-links.html`, and `assets/`. Do not upload the `.git` folder.
3. Under the deployed preview URL, choose **Customize** and set the project name to `naduni-and-ushan`, if available. An alternative is `naduni-ushan-wedding-2026`.
4. Copy the actual published HTTPS address. The suggested name is not reserved or live until deployment succeeds.
5. Open `/create-guest-links.html` on that address to generate customer-facing guest links. It automatically uses the current hosting address. The invitation's Share button also uses that address.

After later changes, upload a fresh package to the **existing project's Deploys page** to keep the same address. GitHub Pages remains a separate deployment unless you connect Netlify to the GitHub repository.

Official guide: https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/

## Two media files still to upload
The source package includes these two larger binary files, but they have **not** been uploaded to GitHub yet:

1. `assets/invitation-film.mp4`
2. `assets/invitation-poster.png` (optional — the page currently uses `assets/couple.png` as its poster)

Download the full project ZIP from the ChatGPT conversation and upload the video via GitHub's **Add file → Upload files** into `assets/`. Keep the filename exactly `invitation-film.mp4`. The video element will work once that file is present.

Other assets, site HTML, styling, scripts and guest-link generator are committed on `main`.
