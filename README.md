# Personal Site

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) (using Svelte 5)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using CSS-first configuration in `src/app.css`)
- **Deployment:** GitHub Pages with `@sveltejs/adapter-static`

## Development

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:mattcookio/mattcook.io.git
    cd mattcook.io
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the specified port) in your browser.

## Building for Production

To create a production version suitable for static deployment:

```bash
npm run build
```

This will generate the static files in the `build/` directory using `@sveltejs/adapter-static`.

## Deployment

This site is automatically deployed to GitHub Pages on every push to the `main` branch via the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

The live site is available at: [https://mattcookio.github.io/mattcook.io/](https://mattcookio.github.io/mattcook.io/)
