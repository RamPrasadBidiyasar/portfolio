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

## Editing

- `index.html`: all content (hero, proof strip, five case studies with inline SVG diagrams, experience, skills, side projects, contact) plus metadata and JSON-LD.
- `styles.css`: design tokens for light and dark themes, layout, components, print styles.
- `script.js`: theme toggle (remembered in localStorage), copy-email, current-section highlight, scroll reveal.
- `assets/fonts/`: self-hosted Inter and JetBrains Mono (variable, Latin subset, SIL Open Font License). No third-party font requests.
- `assets/og-image.png`: 1200x630 link-preview image.
- `assets/Ram-Prasad-Bidiyasar-Resume.pdf`: downloadable resume.
- `sitemap.xml`: single-page sitemap.

No analytics, tracking or third-party scripts. Motion respects the visitor's reduced-motion setting. Diagrams are conceptual and generalized; they are not the production topology of any internal system, and no internal service names, hostnames, IDs or code are published.

## Content rules

- Metrics come from the resume and annual review and should match the resume and LinkedIn exactly. Update all three together.
- Check the employer's confidentiality policy before adding internal architecture detail.
