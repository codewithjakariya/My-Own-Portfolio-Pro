# Production build notes

This is the production-ready version of the portfolio. Here's what changed
from the original and what you should do at deploy time.

## What was fixed

- **Images optimized**: profile/logo photos went from ~685 KB each down to
  16–108 KB, project screenshots from ~100–200 KB down to 24–56 KB, and the
  social share image (`og-image`) from 1.47 MB down to 84 KB at the correct
  1200×630 size. WebP versions are served via `<picture>` with a PNG
  fallback, and all images now have explicit `width`/`height` to prevent
  layout shift.
- **CSS/JS bundled**: the 9 CSS files are combined and minified into
  `css/app.min.css`, and the 9 local JS files into `js/app.min.js` — cuts
  17 requests down to 2. Original source files are kept in `/src` for future
  editing; re-minify from there if you make changes (don't hand-edit the
  `.min` files).
- **Security**: added `rel="noopener noreferrer"` to the 3 external links
  that were missing it.
- **SEO**: added `robots.txt` and `sitemap.xml`.
- **Cleanup**: removed the unused `.vscode` folder, an orphaned/stale
  `data/projects.json` (referenced projects and images that didn't exist
  anywhere on the site), and 10 unused image assets (leftovers like
  `facbook.png`, `gitt.png`, `likee.png`).

## Do these before/at deploy (couldn't be done in this sandbox — no internet access)

1. **Add Subresource Integrity (SRI) hashes** to the three CDN `<script>`
   tags (EmailJS, SweetAlert2, tsParticles) and the Font Awesome
   `<link>`. Generate them at https://www.srihash.org by pasting each CDN
   URL, then add `integrity="..." crossorigin="anonymous"` to the tag.
   I didn't fabricate these myself — a wrong hash blocks the resource
   entirely and would break the site, so it's safer for you to generate
   and verify them against the live files.
2. **Restrict your EmailJS key to your domain.** In the EmailJS dashboard →
   your service → allowed origins, add `https://jibon.vercel.app` (and your
   preview URLs if you use Vercel previews). The public key in `config.js`
   is meant to be public, but locking it to your domain stops anyone else
   from sending mail through your account from a different site.
3. **Run a real Lighthouse pass after deploying** (Chrome DevTools →
   Lighthouse, or PageSpeed Insights). Everything static was optimized here,
   but the real Performance score also depends on your host's TTFB/CDN,
   which I can't test from this sandbox. Should land at or very near 100
   across Performance/Accessibility/Best Practices/SEO — if anything's
   short, it'll likely be a caching-headers or TTFB tweak on Vercel's side,
   not the code itself.
