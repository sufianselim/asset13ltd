# Asset 13 LTD — Static Website

A premium, fully responsive corporate website for **Asset 13 LTD** (housing & real estate), built as a **static site**: plain HTML, CSS, and vanilla JavaScript with no build step and no dependencies.

- **Domain:** https://asset13.com
- **Pages:** Home, About, Projects (with filters), three project detail pages, Services, Contact, custom 404
- **Deploy target:** cPanel / shared hosting (`public_html`)

---

## 1. Preview locally

Because the site uses clean directory URLs (for example `/about/`), preview it with a small local server rather than opening the HTML files directly.

Any one of these works:

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

Then open `http://localhost:8080/`.

In VS Code, the **Live Server** extension also works (right-click `index.html` → *Open with Live Server*).

---

## 2. File structure

```
/
├─ index.html                         Home
├─ about/index.html                   About
├─ projects/index.html                Projects listing + filters
├─ projects/riverside-residences/     Project detail (sample)
├─ projects/garden-court/             Project detail (sample)
├─ projects/harbor-view-terraces/     Project detail (sample)
├─ services/index.html                Services
├─ contact/index.html                 Contact + form
├─ 404.html                           Custom not-found page
├─ favicon.svg
├─ robots.txt
├─ sitemap.xml
├─ .htaccess                          HTTPS, www redirect, 404, caching, security headers
├─ assets/
│  ├─ css/styles.css                  Full design system
│  ├─ js/config.js                    Contact details, WhatsApp, form endpoint, socials, map
│  ├─ js/main.js                      Navigation, filters, lightbox, form, reveals
│  └─ images/                         Photography and logo
├─ README.md
└─ CREDITS.md
```

---

## 3. Customise the site

### Contact details and integrations — `assets/js/config.js`

This is the only file you need to edit for the interactive settings:

| Setting | What it does |
| --- | --- |
| `contactEmail` | Email used in links and the form fallback. **Currently a placeholder: `info@asset13.com`.** |
| `whatsappNumber` | Digits only, international format (e.g. `8801712345678`). Leave blank to hide every WhatsApp button. |
| `whatsappMessage` | Pre-filled WhatsApp message. |
| `formEndpoint` | Optional form backend (Formspree, Web3Forms, Basin). See section 4. |
| `mapQuery` | Google Maps search query for the office. Leave blank to keep the “address on request” panel. |
| `social` | Instagram / Facebook / LinkedIn URLs. Empty entries are hidden automatically. |

### Page copy and images

- Copy lives directly in each `index.html`. Search for the section heading you want to change.
- Images live in `assets/images/`. Replace a file with the same name to keep the layout, or update the `src` paths.
- Keep `width` and `height` attributes on images and descriptive `alt` text for accessibility and layout stability.

### Add a new project

1. Duplicate `projects/riverside-residences/` and rename the folder, e.g. `projects/my-new-project/`.
2. Update the `<title>`, meta description, canonical URL, project name, facts, copy, and gallery images.
3. Add a project card to `projects/index.html` (copy an existing `<article data-project-card>`) and set `data-status` to `upcoming`, `ongoing`, or `completed`.
4. Add the card to the home page’s featured grid in `index.html` if required.
5. Add the URL to `sitemap.xml`.
6. Update internal links on the related-projects sections of the other project pages.

### Add real testimonials

There is intentionally **no testimonial section** yet, because the brief requires genuine, approved client quotes. When real testimonials are available, add a section to `index.html` using the existing `.statement` block as a visual reference, with the actual quote, client name, and permission.

### Replace the sample projects

The three projects are **illustrative samples**, clearly labelled “Sample” on the site. Replace their names, copy, imagery, facts, and status when real project information is available. Never present sample content as completed work.

---

## 4. Contact form options

The form is wired for a static site. Out of the box it validates in the browser and opens the visitor’s email app with a pre-filled message to `contactEmail`.

**Recommended: connect a form service**

1. Create a form at [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/) using the real company email.
2. Copy the endpoint URL.
3. Paste it into `formEndpoint` in `assets/js/config.js`.
4. Submit a test enquiry and confirm it arrives.

Submissions then post via `fetch()` and show an inline success message. If the request fails, the site automatically falls back to the `mailto:` route.

**What the form protects against:** a honeypot field, client-side validation, length limits, and no third-party scripts. Spam filtering is handled by the form service.

---

## 5. Deploy to cPanel

1. **Build files:** nothing to build. Zip the entire project folder.
2. **Upload:** in cPanel → *File Manager*, open `public_html` and upload the zip, then extract it so `index.html` sits directly inside `public_html`.
   - Include the hidden `.htaccess` file (enable *Settings → Show Hidden Files*).
   - You may exclude `prompt.md`, `README.md`, `CREDITS.md`, and `.commandcode/` from the upload; they are not used by the live site. The included `.htaccess` also blocks them if they are uploaded.
3. **Domain:** point `asset13.com` to the hosting account (A record) and add the domain in cPanel if it is an add-on domain. Point `www` to the same place.
4. **SSL:** run *AutoSSL* and confirm `https://asset13.com` is active. The included `.htaccess` forces HTTPS and redirects `www` to the non-www domain.
5. **404:** the `.htaccess` sets `ErrorDocument 404 /404.html`. Verify by visiting a non-existent URL.
6. **Permissions:** files `644`, folders `755`.
7. **Test:** check every page, the mobile menu, filters, gallery lightbox, and a form submission.

If the host does not allow `.htaccess` overrides, ask support to enable `AllowOverride All` for the domain, or apply the HTTPS/www redirects in cPanel instead.

### After launch

- Replace the placeholder email (`info@asset13.com`) with the real mailbox.
- Add the real WhatsApp number, office address (or `mapQuery`), and social URLs in `config.js`.
- Submit `https://asset13.com/sitemap.xml` in Google Search Console.
- If the final domain differs from `asset13.com`, update every canonical URL, Open Graph URL, `sitemap.xml`, `robots.txt`, and the JSON-LD block.

---

## 6. Accessibility & performance notes

- Semantic landmarks, a skip link, labelled fields, visible focus styles, and keyboard-operable mobile navigation and lightbox.
- Motion respects `prefers-reduced-motion`.
- Images use explicit dimensions, lazy loading below the fold, and the hero image is preloaded.
- Fonts are loaded from Google Fonts with `display=swap`; if the network is unavailable, the site falls back to system serif/sans-serif stacks.
- Gold text on light backgrounds uses the darker `--gold-700` token to maintain contrast.

**Lighthouse tip:** the Google Fonts and the Google Maps iframe (when enabled) are the main third-party requests. Self-hosting the fonts is the easiest further improvement if required.

---

## 7. Placeholder and compliance notes

- `info@asset13.com` is a placeholder email derived from the given domain. Confirm or replace it before launch.
- Phone, office address, WhatsApp number, map location, and social profiles are intentionally blank until supplied.
- Sample projects are labelled and must not be described as completed real developments.
- No registration numbers, awards, years in business, unit counts, or testimonials have been invented.
- If a privacy policy is required for the contact form, add it once approved legal copy is supplied and link it in the footer.

---

© Asset 13 LTD. Photography credits are listed in `CREDITS.md`.
