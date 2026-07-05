# Trusted Tanzania Host — Website

Multi-page static website for **Trusted Tanzania Host**, the investor / NGO / diaspora / explorer concierge arm of Ghikas Adventures, Morogoro, Tanzania.

Live site target: **https://tanzaniahost.ghikasadventures.com**

---

## What's in this repo

```
index.html        Home — hero, services teaser, Why Tanzania teaser, gallery, testimonials
about.html         About Us — Jonathan's story, the Ghikas ecosystem, How It Works
tanzania.html       Why Tanzania — peace, diversity, opportunity, attractions, regions
services.html       Full service details — Charity, Investment, Real Estate, Minerals, Explorer
contact.html        Contact — info, map, full intake form
disclaimer.html     Liability & Scope Disclaimer
privacy.html        Privacy Policy
styles.css          All site styling (colour tokens, icons, layout)
main.js             Nav, scroll reveal, gallery controls, form handling
logo-full.png, hero-bg.jpg, about-jonathan.jpg, favicon.png,
apple-touch-icon.png, og-image.jpg, slide-*.jpg,
tanzania-*.jpg      Site images
sitemap.xml         Search-engine sitemap (all pages)
robots.txt          Crawler rules
CNAME               Custom domain config for GitHub Pages
```

No build step, no framework, no dependencies. Every file sits at the **root of
the repo — no subfolders** — specifically so this uploads correctly from a
phone. (GitHub's mobile file uploader flattens folder structures, which breaks
any site that relies on `css/`, `js/`, or `images/` subfolders — this version
avoids that entirely.)

Open `index.html` directly in a browser to preview, or deploy as-is.

---

## How to publish this on GitHub Pages (step by step)

1. **Create a new repository** on GitHub (e.g. `trusted-tanzania-host`). On the
   free plan the repo must be **public** for Pages to work.

2. **Upload every file from this zip to the repo root** — since there are no
   subfolders, this works reliably even from a phone:
   - On mobile: extract the zip first, then in GitHub go to your repo →
     "Add file" → "Upload files" → select **all files at once** (multi-select
     in your file manager) → commit.
   - On desktop, you can instead use git:
     ```bash
     git init
     git add .
     git commit -m "Initial site upload"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/trusted-tanzania-host.git
     git push -u origin main
     ```

3. **Turn on GitHub Pages**
   - Repo → **Settings → Pages**
   - **Source: Deploy from a branch** → **Branch: main**, folder **/ (root)** → Save
   - GitHub gives you a temporary URL like `https://YOUR-USERNAME.github.io/trusted-tanzania-host/`

4. **Point your custom subdomain at it**
   - This repo includes a `CNAME` file containing `tanzaniahost.ghikasadventures.com`
   - In your DNS provider for `ghikasadventures.com`, add a **CNAME record**:
     Host: `tanzaniahost` → Target: `YOUR-USERNAME.github.io`
   - Back in **Settings → Pages**, enter the custom domain, save, wait for DNS,
     then tick **Enforce HTTPS**.

5. **Done.** Any future edit — swap a photo, change text — just re-upload that
   one file on GitHub and Pages redeploys automatically in a minute or two.

---

## Pages overview

- **Home** — first impression, quick services teaser, a taste of "Why Tanzania," the on-the-ground photo gallery, testimonials, and calls to action.
- **About Us** — Jonathan's background and credentials, the three-brand Ghikas ecosystem (Ghikas Adventures, Luminara Gems, Trusted Tanzania Host), and the 4-step engagement process.
- **Why Tanzania** — built to attract investors, charities and travellers: peace & stability, multicultural harmony, natural abundance, strategic location, growing economy, and top attractions, plus full regional coverage.
- **Services** — the five service lines in full detail, each with its own scope disclaimer.
- **Contact** — all contact channels, an embedded map, and the full intake form.

## Colourful service icons

Each service now has its own colour-coded icon (charity = red, investment = blue, real estate = green, minerals = purple, explorer = orange) so the services are easy to tell apart at a glance, on both the homepage and Services page.

## Notes on the contact form

The intake form has no backend — submitting it opens the visitor's email app
with the enquiry pre-filled, addressed to `info@ghikasadventures.com`. If you'd
like real form submissions instead (saved to a spreadsheet, or emailed
automatically), that requires a small form-backend service (e.g. Formspree,
Netlify Forms) — ask if you'd like this wired up.

## Legal & disclaimer content

`disclaimer.html` and the "not legally responsible" language in the contact
form checkbox are drafted based on the discussions in this project, not by a
lawyer. Have a Tanzanian lawyer review the actual liability disclaimer text
before relying on it commercially.

## What's new in v5

- **Real photos** in Real Estate and Explorer service sections; Tanzania nature photo fixed (was broken Pixabay link)
- **Ecosystem logos** — Ghikas Adventures and Luminara Gems now show their actual logos on the About page, not placeholder icons
- **Gallery upgrade** — the homepage "On the Ground" section is now an auto-crossfading spotlight (Option A from the planning doc) instead of a manual swipe slideshow
- **Expanded About page** — founder bio now includes research background (Saanane Island, Tarangire), Safeguarding & Child Protection certification, and a new "Community, Conservation & Faith Involvement" section listing NGO, conservation, and church affiliations
- **New Insights page** — 3 written articles (investing in Tanzania, NGO logistics, buying property) for SEO and credibility
- **New lead magnet** — `tanzania-investment-checklist.pdf`, a free downloadable checklist linked from the Contact and Insights pages
- **Minerals section** — left text-only for now (the supplied photo looked like active mining equipment, which conflicts with the site's "guidance only, no site visits" legal positioning)

## Deferred (by agreement, not built in this version)

- **Multi-language switcher** — significant build effort; recommended to launch English-only first and add once there's real demand
- **Real form backend (Formspree)** — requires you to create a free Formspree account first; the form still uses the mailto fallback until you provide an endpoint
- **Real testimonials / case studies** — placeholders remain until you have actual client stories to share
- **Google Business Profile / local directories** — not a website file; a listing you set up directly with Google, separate from this repo

