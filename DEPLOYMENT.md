# Deploying Asset 13 LTD to cPanel

This repository deploys the built site to **cPanel shared hosting** using **GitHub Actions over SFTP**.

SFTP is used instead of FTP because shared-hosting firewalls commonly block FTP passive data ports. SFTP (port 22) avoids that problem entirely.

How it works:

1. Push to `main` (or run the workflow manually).
2. GitHub Actions installs dependencies, lints, and builds `dist/`.
3. The workflow uploads the contents of `dist/` to `public_html/` using `lftp` over SFTP.
4. cPanel serves the static files; no Node runtime is required on the host.

The workflow is `.github/workflows/deploy-sftp.yml`. Until SFTP secrets are configured, the build still runs but the deploy step is skipped safely.

---

## 1. One-time cPanel setup

### Domain and document root

1. In cPanel → **Domains**, confirm `asset13.com` is added and its document root is `public_html`.
2. Point the domain's DNS to the cPanel server if it is not already resolving there.
3. In **SSL/TLS Status**, run **AutoSSL** and confirm HTTPS is active before testing the site. The `.htaccess` forces HTTPS.

### Enable SSH / SFTP

1. In cPanel, open **SSH Access** (or **Terminal**, if available).
2. Confirm SSH access is enabled for the main cPanel account. Some hosts require a support ticket to enable it.
3. Use the **main cPanel username and password** for SFTP. A dedicated FTP sub-account such as `deploy@asset13.com` usually does **not** have SFTP/SSH access.

### Test SFTP before adding secrets

Use FileZilla, WinSCP, or another SFTP client:

| Setting | Value |
| --- | --- |
| Protocol | **SFTP** |
| Host | `cloud.mywhiteserver.com` (or the cPanel server hostname) |
| Port | `22` |
| Username | **main cPanel username** |
| Password | **cPanel password** |

If the connection works, you should land in `/home/<cpanel-user>/`. The site folder is `public_html` inside that home directory.

If SFTP login fails, ask the hosting provider to enable SSH/SFTP for the cPanel account. FTP passive ports are blocked on this server, so FTP/FTPS is not a reliable alternative.

---

## 2. Add GitHub repository secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**.

| Secret | Required | Value |
| --- | --- | --- |
| `SFTP_SERVER` | Yes | `cloud.mywhiteserver.com` (or your server hostname) |
| `SFTP_USERNAME` | Yes | **Main cPanel username** |
| `SFTP_PASSWORD` | Yes | **Main cPanel password** |
| `SFTP_PORT` | Optional | `22` (default) |
| `SFTP_REMOTE_DIR` | Optional | `public_html` (default). Use an absolute path such as `/home/USER/public_html` if needed. Use `.` if the SFTP login is already inside `public_html`. |

The workflow falls back to the older `FTP_SERVER`, `FTP_USERNAME`, and `FTP_PASSWORD` secrets if the `SFTP_*` versions are missing. For reliability, add explicit `SFTP_*` secrets using the main cPanel account.

Never commit SFTP credentials to the repository.

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

GitHub → **Actions** → **Deploy to cPanel (SFTP)** → **Run workflow** → choose `main` → **Run**.

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

## 5. Manual deployment (fastest fallback)

A ready-to-upload build is available in the project root as `asset13ltd-dist.zip`.

1. cPanel → **File Manager** → open `public_html`.
2. Upload `asset13ltd-dist.zip`.
3. Right-click the zip → **Extract**. The zip has `index.html` at its root, so it extracts directly into `public_html`.
4. Delete the zip.
5. Enable **Settings → Show Hidden Files** and confirm `.htaccess` is present.
6. Reload the site and run the verification checklist.

To build it yourself instead:

```bash
npm ci
npm run build
```

Upload the **contents of `dist/`**, including the hidden `.htaccess`. Do not upload the repository root, `src/`, `node_modules/`, or `package.json`.

---

## 6. Updating and rollback

- **Update:** push a new commit to `main`; GitHub Actions rebuilds and uploads changed files via SFTP.
- **Rollback:** revert the problematic commit and push, or re-run a previous successful workflow from the Actions tab.
- Keep a cPanel backup or a copy of `public_html` before major changes.
- The SFTP mirror does not delete files that are no longer in `dist/` (for example, old hashed JS/CSS). They are harmless; remove them manually if you want a completely clean folder.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| Workflow succeeds but deployment was skipped | Add `SFTP_SERVER`, `SFTP_USERNAME`, and `SFTP_PASSWORD`; re-run the workflow. |
| `Permission denied (publickey,password)` | Use the **main cPanel account**, not an FTP sub-account. Confirm SSH/SFTP is enabled in cPanel. |
| `Could not resolve hostname` | Check `SFTP_SERVER`; use `cloud.mywhiteserver.com` or the server IP/hostname. |
| Files upload to the wrong folder | Check the remote home with the `pwd` line in the workflow log. Set `SFTP_REMOTE_DIR` to `public_html`, `.`, or an absolute `/home/USER/public_html` path. |
| `No such file or directory` on the remote path | Create `public_html` in cPanel, or correct `SFTP_REMOTE_DIR`. |
| FTP/FTPS times out on data connection | Expected on this host: passive FTP ports are blocked. Use SFTP, or ask the host to open the passive range. |
| Direct `/about` returns 404 | Ensure `.htaccess` is present in `public_html` and `AllowOverride All` is enabled. |
| CSS/JS loads an old version | Hard-refresh the browser; hashed assets are cached, but `index.html` is not. |
| HTTPS redirect loop | Confirm AutoSSL is active and the certificate covers both `asset13.com` and `www.asset13.com`. |

---

## Notes

- The site is a client-rendered React SPA. The `.htaccess` fallback is required for direct visits to `/about`, `/projects/...`, `/services`, and `/contact`.
- The `.htaccess` also blocks internal repository files and the old FTP sync state file.
- Contact details, WhatsApp, form endpoint, map, and social links are configured in `src/lib/config.js`.
