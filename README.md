# CheckMate — Restaurant Bill Splitter

Split restaurant bills accurately by item. Handles shared dishes, individual orders, tips, and discounts.

## Features

- Add diners with color-coded avatars
- Add items with name, price, quantity, and category
- Assign each item to one or more diners (shared items split automatically)
- Tip: percentage, fixed amount, or none — distributed proportionally or equally
- Discount/coupon support
- Full per-diner breakdown showing every item, tip share, and final amount

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173/checkmate/

## Deploy to GitHub Pages

### One-time setup

1. Create a new GitHub repository (e.g. `checkmate`)
2. Push this code to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/checkmate.git
   git push -u origin main
   ```
3. In your GitHub repo → **Settings → Pages**:
   - Source: **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`.

Your app will be live at: `https://YOUR_USERNAME.github.io/checkmate/`

### Important: update the base path

If your repository is named something other than `checkmate`, update `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/',
})
```

And update `index.html` favicon path accordingly.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- No backend — all state is local
