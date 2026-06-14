# Gympath — Landing Site

Customer-facing marketing + storefront for the Gympath smart fitness tracker.
Static site (HTML/CSS/JS), deployed via GitHub Pages.

## Pages
- `index.html` — hero, features, product, how-it-works, app showcase, **shop**, **subscription plans**, CTA
- `account.html` — sign up / log in (demo, localStorage)
- `profile.html` — user profile, current plan, order history

## Notes
- **Auth is a front-end demo** (localStorage in `assets/js/auth.js`). It will be
  swapped to call the FastAPI backend (`/auth/register`, `/auth/login`, `/auth/me`, JWT)
  once the backend is publicly hosted.
- **Checkout** records order/plan intent only — no real payment yet.
- Videos/posters are sourced from the product pitch deck (`docs/Gym Path (1).pptx`),
  converted to web-friendly mp4/jpg.

## Local preview
```
python -m http.server 8090
# open http://localhost:8090
```

## Deploy (GitHub Pages — org/user site)
Push the contents of this folder to a repo named `<org>.github.io` (default branch root).
`.nojekyll` is included so the `assets/` folder is served as-is.
