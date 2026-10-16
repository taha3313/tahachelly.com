# Repository instructions

## Deploying `tahachelly.com`

Production is served by the Cloudflare Worker `tahachelly-com`, connected to the private GitHub repository. Its static assets come from `./dist` as configured in `wrangler.jsonc`.

For website changes:

1. Edit the root source files and keep their deployed copies under `dist/` in sync. In particular, mirror `index.html`, `styles.css`, `theme.js`, and any changed static assets. The Cloudflare build serves `dist/`.
2. Run `npx --yes wrangler@4.151.0 deploy --dry-run` and `git diff --check` before publishing.
3. Commit and push the requested change to `main`. Production publishing should use the repository's Git-connected Cloudflare Workers Builds service, not a direct production `wrangler deploy`.
4. Check whether the push started a Cloudflare build. If it did not, use the connected Cloudflare tools to create a temporary deploy hook for branch `main` on `tahachelly-com`, trigger it once, and poll its build until `build_outcome` is `success` or `failure`. Delete the temporary hook after the build finishes. Never put Cloudflare tokens or other secrets in the repository.
5. Verify the deployed behavior at `https://tahachelly.com/` in a browser, including changed assets and the relevant responsive/theme states. A successful build alone does not prove that the live page is current.
6. If the build succeeds but the homepage still returns old HTML, inspect the live document and asset URLs first. Purge only the stale homepage URLs (`https://tahachelly.com/` and, when relevant, `https://www.tahachelly.com/`) through Cloudflare Cache, then reload and verify the versioned stylesheet and assets. Use a new query version when changing a cached CSS or asset URL.

Do not report a change as deployed until the Cloudflare build succeeds and the live site serves the updated content.
