# Asset 13 LTD — Corporate Website

A premium, fully responsive corporate website for **Asset 13 LTD** (housing & real estate), built with **React 19, Vite, Tailwind CSS 4, Lucide React, and React Router**.

- **Domain:** https://asset13.com
- **Pages:** Home, About, Projects (with status filters), three project detail pages, Services, Contact, 404
- **Output:** static production files in `dist/` — deployable to cPanel without a Node runtime

---

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 + a custom design system in `src/styles.css` |
| Routing | React Router 7 (`BrowserRouter`) |
| Icons | Lucide React |
| Linting | ESLint 9 |

---

## Quick start

Requirements: **Node.js 20.19+** (or 22.12+).

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

---

## Project structure

```
/
├─ index.html                    Vite entry (base metadata, fonts, no-JS notice)
├─ src/
│  ├─ main.jsx                   React entry + BrowserRouter
│  ├─ App.jsx                    Routes and scroll-reveal orchestration
│  ├─ styles.css                 Tailwind import + full design system
│  ├─ components/
│  │  ├─ layout/                 Header, mobile menu, footer, layout, scroll-to-top
│  │  ├─ ui/                     Page meta, page hero, CTA band, logo, socials, WhatsApp
│  │  ├─ home/                   Hero, trust strip, about preview, projects, why, services…
│  │  ├─ project/                Project card, gallery/lightbox
│  │  └─ contact/                Validated contact form, contact details
│  ├─ pages/                     Home, About, Projects, ProjectDetail, Services, Contact, NotFound
│  ├─ data/                      site copy, projects, services
│  ├─ hooks/                     Scroll reveals
│  └─ lib/                       Contact/social/form configuration
├─ public/
│  ├─ images/                    Photography, logo, social-share image
│  ├─ 404.html                   Static Apache fallback
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ .htaccess                  SPA fallback, HTTPS/www redirects, caching, security
├─ .github/workflows/deploy-sftp.yml  GitHub Actions → cPanel SFTP deployment
├─ DEPLOYMENT.md                  Deployment, secrets, verification, rollback
├─ package.json
├─ vite.config.js
└─ eslint.config.js
```

---

## Customisation

### Contact details and integrations — `src/lib/config.js`

| Setting | What it does |
| --- | --- |
| `contactEmail` | Email used in the footer, contact page, project enquiries, and form fallback. **Currently a placeholder: `info@asset13.com`.** |
| `whatsappNumber` | Digits only, international format (e.g. `8801712345678`). Leave blank to hide all WhatsApp links and the floating button. |
| `whatsappMessage` | Pre-filled WhatsApp message. |
| `formEndpoint` | Optional form backend (Formspree, Web3Forms, Basin). See below. |
| `mapQuery` | Google Maps search query for the office. Leave blank to keep the “address on request” panel. |
| `social` | Instagram / Facebook / LinkedIn URLs. Empty entries are hidden. |

### Content

- **Pages and section copy:** `src/data/site.js`
- **Projects:** `src/data/projects.js` — add an object to the array; routes, cards, and detail pages update automatically.
- **Services:** `src/data/services.js`
- **Images:** `public/images/` — replace a file with the same name, or update the path in the relevant data file.

### Adding a project

1. Add an entry to `src/data/projects.js` with a unique `slug`.
2. Point `cover` and `gallery` entries at files in `public/images/`.
3. Add the new URL to `public/sitemap.xml`.
4. Run `npm run build`.

Projects with `isSample: true` display the “Sample” badge. Keep it until real project information is confirmed.

### Testimonials

There is intentionally **no testimonial section** yet, because the brief requires genuine, approved client quotes. Add one once real testimonials and permission are available.

---

## Contact form

The form validates in the browser (name, email, optional phone, message length) and protects against bots with a honeypot field.

- **Default:** opens the visitor’s email app with a pre-filled message to `contactEmail`.
- **Recommended:** create a form at [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/), paste the endpoint into `formEndpoint`, and test a submission.

The selected project is carried through links such as `/contact?project=riverside-residences` and pre-fills the form.

---

## Deployment to cPanel

The production build is fully static; cPanel does **not** need Node.js.

### Automated via GitHub Actions (recommended)

`.github/workflows/deploy-sftp.yml` lints, builds, and uploads `dist/` to cPanel over SFTP on every push to `main`.

1. In cPanel → **SSH Access**, confirm SSH/SFTP is enabled and use the **main cPanel account** for SFTP. FTP passive ports are blocked on this server.
2. Add `SFTP_SERVER`, `SFTP_USERNAME`, and `SFTP_PASSWORD` secrets in GitHub → **Settings → Secrets and variables → Actions**.
   - Optional: `SFTP_PORT` (default `22`) and `SFTP_REMOTE_DIR` (default `public_html`).
3. Run **Actions → Deploy to cPanel (SFTP) → Run workflow**, or push to `main`.
4. Full setup, verification, rollback, and troubleshooting: **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Until the SFTP secrets are added, the workflow still lints and builds but skips deployment.

### Manual deployment

1. Run `npm run build`.
2. Upload the **contents of `dist/`** into `public_html`.
   - Include the hidden `.htaccess` (enable *Settings → Show Hidden Files*).
3. Point `asset13.com` at the hosting account and run **AutoSSL**.
4. The `.htaccess` forces HTTPS, redirects `www` → non-www, serves the React SPA fallback, sets caching/security headers, and sets the custom 404.

### How the SPA fallback works

`public/.htaccess` serves real files and directories directly, then rewrites every other path to `index.html`. That makes direct visits to `/about`, `/projects/riverside-residences`, and `/contact` work correctly instead of returning Apache 404s.

### Updating the site

Push to `main` for the automated deployment, or rebuild and replace the contents of `public_html` with the new `dist/` output. Keep the previous folder for rollback.

---

## SEO notes

- `index.html` contains default title, description, canonical, Open Graph, and JSON-LD metadata.
- Each route updates its title, description, canonical URL, and social metadata client-side via `PageMeta`.
- `public/sitemap.xml` and `public/robots.txt` cover the public routes.
- The 404 route is marked `noindex`.

Because this is a client-rendered SPA, search engines must execute JavaScript to see route-specific metadata. If stronger crawl-time SEO is required later, add a prerender step or move to an SSR framework.

---

## Placeholders and compliance

- `info@asset13.com` is a placeholder derived from the given domain. Confirm or replace it before launch.
- WhatsApp is configured as `8801628374300`; the office address, map location, and social profiles remain blank until supplied.
- Sample projects are labelled and must not be described as completed real developments.
- No registration numbers, awards, years in business, unit counts, or testimonials have been invented.
- Legal pages (Privacy/Terms) are omitted until approved copy is provided.

---

## Verification

```bash
npm run lint
npm run build
```

Browser QA covered client-side navigation, project filters, gallery lightbox, contact-form validation, project prefill, anchor scrolling under the fixed header, mobile menu inert/focus behaviour, mobile overflow, per-page metadata, and console/network errors.

---

© Asset 13 LTD. Photography credits are listed in `CREDITS.md`.
