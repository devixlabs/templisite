# Subtasks: Phase 1 — Identity & Configuration

Status: planned
Parent: `TODO.md`
Decomposes: #1 → (1.1, 1.2, 1.3, 1.4, 1.5, 1.6)

---

## 1.1 — Update site.yml with real identity
**Parent:** #1

**Modify:** `src/_data/site.yml`

Set all placeholder values: `title`, `description`, `url` (real domain), `author`, `email`, `social.*` (twitter/linkedin/github handles). Also set `seo.image` path or decide whether to leave it for Phase 2 when real images exist. `logo` path may also be Phase 2 — just note what's deferred.

**Checkpoint:** `npm run build` — builds without errors; `dist/` HTML should reflect updated title and social values.

---

## 1.2 — Update sitemap hostname in .eleventy.js
**Parent:** #1

**Modify:** `.eleventy.js`

Change `hostname: "https://your-domain.com"` in the sitemap plugin config to match the real URL set in `site.yml`.

**Checkpoint:** `npm run build` — `dist/sitemap.xml` should contain the real domain URL.

---

## 1.3 — Update package.json metadata
**Parent:** #1

**Modify:** `package.json`

Set `name` (kebab-case project name), `author` (real name or org), `description` (one-line description of the actual site). Version can stay `1.0.0`.

**Checkpoint:** `node -e "const p=require('./package.json'); console.log(p.name, p.author)"` — should print real values, not placeholders.

---

## 1.4 — Replace favicon.ico
**Parent:** #1

**Modify/Replace:** `src/static/favicon.ico`

Replace the placeholder favicon with a real one. Options: generate from a logo using a favicon generator, use a simple text/letter favicon, or use a 1x1 transparent placeholder temporarily. Must be a valid `.ico` file.

**Checkpoint:** `npm run build` — `dist/favicon.ico` exists and is a valid image file (open in browser to verify).

---

## 1.5 — Review and update robots.txt
**Parent:** #1

**Modify:** `src/static/robots.txt`

Review current content. Update the `Sitemap:` directive if present to use the real domain URL. Ensure `User-agent: *` rules are appropriate for the site.

**Checkpoint:** `npm run build` — `dist/robots.txt` contains the correct sitemap URL.

---

## 1.6 — Decide target domain and hosting plan
**Parent:** #1

Non-code planning task. Decide and document:
- What domain will this site use?
- S3 + CloudFront, or a different host?
- Is DNS already set up, or does it need to be provisioned (see `iac-conventions` skill if using DevixLabs IaC)?

Record the decision in `docs/decisions/hosting.md` (create `docs/decisions/` if it doesn't exist) so future phases have a clear reference.

**Checkpoint:** `docs/decisions/hosting.md` exists and answers the three questions above.
