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

- `index.html`: portfolio content, experience, project stories, and links.
- `styles.css`: responsive layout, colors, typography, and visual effects.
- `script.js`: email copying and active navigation.
- `assets/Ram-Prasad-Bidiyasar-Resume.pdf`: downloadable resume.

Google Fonts supplies DM Sans and Space Grotesk; local system fonts are used if unavailable. No analytics or tracking is included. Motion respects the visitor’s reduced-motion preference. Project illustrations are conceptual, not live metrics or screenshots of internal systems.

Content and career metrics are based on the provided resume. Repository implementation informed the CDN selection, reactive watch-history, and Aerospike workspace stories. Career impact metrics and the API gateway description come from the resume; the gateway source was not located in the supplied repository folder. Internal application source, configurations, and credentials are not included.
