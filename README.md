# Naduni & Ushan — Wedding Invitation

A responsive ivory-and-gold wedding invitation website.

## Wedding
- **Date:** 10 December 2026
- **Venue:** Earl's Court, Cinnamon Lakeside, Colombo
- **Guest links:** Open `create-guest-links.html` after GitHub Pages is enabled.
- **RSVP:** WhatsApp-based; no Google Sheets backend.
- **Music:** Embedded YouTube reference, from 1:35 to 2:00. Visitors may need to tap Play.

## Deployment
Enable **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.

After deployment, find the published website address under **Settings → Pages**.
To use an address that does not contain a GitHub account name, configure a custom domain in the same Pages settings.

## Two media files still to upload
The source package includes these two larger binary files, but they have **not** been uploaded to GitHub yet:

1. `assets/invitation-film.mp4`
2. `assets/invitation-poster.png` (optional — the page currently uses `assets/couple.png` as its poster)

Download the full project ZIP from the ChatGPT conversation and upload the video via GitHub's **Add file → Upload files** into `assets/`. Keep the filename exactly `invitation-film.mp4`. The video element will work once that file is present.

Other assets, site HTML, styling, scripts and guest-link generator are committed on `main`.
