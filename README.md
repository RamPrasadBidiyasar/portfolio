# Ram Prasad Bidiyasar — Portfolio

A responsive, static portfolio showcasing backend engineering, distributed systems, and production work at Airtel.

## GitHub Pages

1. Open this repository’s **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions** (one-time setup).
3. Push to **main**. The **Deploy portfolio to GitHub Pages** workflow automatically publishes the update.
4. Watch the run in **Actions**; its deployment links to the live site, expected to be https://ramprasadbidiyasar.github.io/portfolio/.

You can also deploy manually from **Actions → Deploy portfolio to GitHub Pages → Run workflow** after the workflow has been pushed. If the initial push happened before enabling Pages, run it manually after setup.

The workflow stages only the public HTML, CSS, JavaScript, and assets. It uses GitHub’s built-in token; no personal access token or deployment secret is needed. Deployment requires the workflow to be pushed successfully and Pages to be enabled.

No build step, framework, backend, or API keys are required. All local asset paths are relative and work under the `/portfolio/` subpath.

## Local preview

Run `python3 -m http.server 8000` in this directory, then open http://localhost:8000.

## Structure

- `index.html`: home page (hero, impact, five case-study previews, experience, philosophy, skills, contact).
- `case/*.html`: one page per case study. Each has a numbered architecture diagram (a horizontal version and a vertical phone version, both inline SVG), a walkthrough, the problem, decisions and trade-offs, failure handling and results.
- `styles.css`: design tokens and components for "The Engineering Journal" (ivory, charcoal, forest green, ember orange; Newsreader, Instrument Sans, IBM Plex Mono).
- `script.js`: phone menu, section highlight, one-time scroll reveal, diagram step highlighting. Everything is visible without JavaScript.
- `assets/fonts/`: self-hosted Latin-subset fonts (SIL Open Font License). No third-party requests.
- `assets/og-image.png`: 1200x630 link-preview image. `assets/Ram-Prasad-Bidiyasar-Resume.pdf`: downloadable resume.
- `sitemap.xml`: lists the home page and the five case studies.

## Editing

Edit the HTML directly. The diagrams are plain SVG; the classes `nd-service`, `nd-queue`, `nd-db`, `nd-cache`, `nd-result`, `nd-fail`, `arrow` and `arrow-fail` define the node and arrow styles in `styles.css`. Step numbers use `data-step`, which the script uses to link a diagram node and its walkthrough line.

No analytics, tracking or third-party scripts. Motion respects the visitor's reduced-motion setting. Diagrams are conceptual and generalized; they are not the production topology of any internal system, and no internal service names, hostnames, IDs or code are published.

## Content rules

- Metrics come from the resume and annual review and must match the resume and LinkedIn exactly. Update all three together.
- Check the employer's confidentiality policy before adding internal architecture detail.
