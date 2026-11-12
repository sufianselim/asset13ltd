# Deploying Asset 13 LTD to cPanel

This repository deploys the built site to **cPanel shared hosting** using GitHub Actions over FTP/FTPS.

How it works:

1. Push to `main` (or run the workflow manually).
2. GitHub Actions installs dependencies, lints, and builds `dist/`.
3. The workflow uploads the contents of `dist/` to `public_html/` on cPanel.
4. cPanel serves the static files; no Node runtime is required on the host.

The workflow is `.github/workflows/deploy.yml`. Until FTP secrets are configured, the build still runs but the deploy step is skipped safely.

---

## 1. One-time cPanel setup

### Domain and document root

1. In cPanel → **Domains**, confirm `asset13.com` is added and its document root is `public_html`.
2. Point the domain's DNS to the cPanel server if it is not already resolving there.
3. In **SSL/TLS Status**, run **AutoSSL** and confirm HTTPS is active before testing the site. The `.htaccess` forces HTTPS.

### FTP credentials

**Recommended: a dedicated FTP account**

1. cPanel → **FTP Accounts** → **Add FTP Account**.
2. Use a dedicated login such as `deploy@asset13.com` and a strong, unique password.
3. Set the directory to `public_html`.
4. Save, then note:
   - **FTP server** — shown on the FTP Accounts page (for example `ftp.asset13.com` or the server hostname/IP).
   - **Username** — for example `deploy@asset13.com`.
   - **Password**.

Because a dedicated account is usually jailed to `public_html`, set `FTP_SERVER_DIR` to `./`.

**Alternative: the main cPanel account**

Use the main cPanel username/password and set `FTP_SERVER_DIR` to `public_html/`. A dedicated account is safer because it can be revoked without changing the main cPanel login.

### Connection mode

- Use **FTPS** (explicit FTP over TLS) on port `21` when available.
- If the host does not support FTPS, set `FTP_PROTOCOL` to `ftp`. This is unencrypted; only use it if the host has no alternative.
- If FTPS fails because of a self-signed certificate, set `FTP_SECURITY` to `loose`.
- SFTP is not handled by this workflow. If your host only offers SFTP, ask for a different deployment action.

---

## 2. Add GitHub repository secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**.

| Secret | Required | Value |
| --- | --- | --- |
| `FTP_SERVER` | Yes | FTP host, e.g. `ftp.asset13.com` |
| `FTP_USERNAME` | Yes | FTP login, e.g. `deploy@asset13.com` |
| `FTP_PASSWORD` | Yes | FTP password |
| `FTP_SERVER_DIR` | Optional | `./` for a dedicated account jailed to `public_html`; `public_html/` for the main cPanel account (default) |
| `FTP_PROTOCOL` | Optional | `ftps` (default) or `ftp` |
| `FTP_SECURITY` | Optional | `strict` (default) or `loose` for a self-signed FTPS certificate |

Never commit FTP credentials to the repository.

---

## 3. Deploy

### Automatic

Push to `main`. The workflow runs automatically and deploys the new build.

```bash
git add .
git commit -m "Update site"
git push origin main
```

### Manual trigger

GitHub → **Actions** → **Deploy to cPanel** → **Run workflow** → choose `main` → **Run**.

Use this after adding the secrets for the first time.

---

## 4. Verify the deployment

Check each of these on the live domain:

- [ ] `https://asset13.com/` loads over HTTPS.
- [ ] `https://asset13.com/about` loads directly (SPA fallback works).
- [ ] `https://asset13.com/projects` and a project detail URL load directly.
- [ ] `https://asset13.com/services` and `https://asset13.com/contact` load.
- [ ] The mobile menu, project filters, gallery lightbox, and contact form validation work.
- [ ] A non-existent route shows the 404 page.
- [ ] `https://asset13.com/sitemap.xml` and `https://asset13.com/robots.txt` load.
- [ ] Images load from `/images/...` and the WhatsApp button opens the correct `wa.me` link.
- [ ] `https://asset13.com/` does not redirect to `www`.

If direct route loads return an Apache 404, confirm `public/.htaccess` was uploaded and that `AllowOverride All` is enabled for the domain.

---

## 5. Manual deployment (fallback)

If GitHub Actions/FTP is unavailable:

1. Build locally:
   ```bash
   npm ci
   npm run build
   ```
2. In cPanel → **File Manager**, open `public_html`.
3. Upload the **contents of `dist/`**, including the hidden `.htaccess` (enable **Settings → Show Hidden Files**).
4. Do not upload the repository root, `src/`, `node_modules/`, or `package.json`.
5. Reload the site and run the verification checklist.

The build output already contains `index.html`, hashed JS/CSS, images, `robots.txt`, `sitemap.xml`, `404.html`, and `.htaccess`.

---

## 6. Updating and rollback

- **Update:** push a new commit to `main`; GitHub Actions rebuilds and uploads changed files.
- **Rollback:** revert the problematic commit and push, or re-run a previous successful workflow from the Actions tab.
- Keep a copy of the previous `public_html` contents (or a cPanel backup) before major changes.
- The FTP action syncs files but does not delete unrelated files in `public_html`. Keep unrelated backups outside that directory.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| Workflow succeeds but says deployment was skipped | `FTP_SERVER`, `FTP_USERNAME`, or `FTP_PASSWORD` is missing. Add the secrets and re-run the workflow. |
| `530 Login authentication failed` | Check the FTP username/password and that the account is active. |
| `ECONNREFUSED` / timeout | Try `FTP_PROTOCOL=ftp` or verify the host and port with the hosting provider. |
| FTPS certificate error | Set `FTP_SECURITY=loose` (self-signed certificate) or ask the host for a valid certificate. |
| Files upload to the wrong folder | A dedicated FTP account jailed to `public_html` needs `FTP_SERVER_DIR=./`; the main account usually needs `public_html/`. |
| Direct `/about` returns 404 | Ensure `.htaccess` is present in `public_html` and `AllowOverride All` is enabled. |
| CSS/JS loads an old version | Hard-refresh the browser; hashed assets are cached for a year, but `index.html` is not. |
| HTTPS redirect loop | Confirm AutoSSL is active and the domain's SSL certificate covers both `asset13.com` and `www.asset13.com`. |

---

## Notes

- The site is a client-rendered React SPA. The `.htaccess` fallback is required for direct visits to `/about`, `/projects/...`, `/services`, and `/contact`.
- The `.htaccess` also blocks the FTP sync state file and internal repository files.
- Contact details, WhatsApp, form endpoint, map, and social links are configured in `src/lib/config.js`.
