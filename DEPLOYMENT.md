# AutoVista Explorer deployment

AutoVista Explorer is a full-stack Node application with a Vite React client, an Express/tRPC server, Drizzle schema migrations, authentication, and a GLB asset loaded at runtime through `GLTFLoader`.

## Production scripts

| Command | Purpose |
| --- | --- |
| `pnpm install --frozen-lockfile` | Install the locked dependency graph. |
| `pnpm check` | Run TypeScript validation. |
| `pnpm test -- --run` | Run the Vitest suite once. |
| `pnpm build` | Build the client into `dist/public` and bundle the server into `dist/index.js`. |
| `pnpm start` | Start the production Node server. |

The production process must use the platform-provided `PORT` environment variable. Do not hardcode a port. The default start command is `pnpm start`.

## 3D asset and attribution

The viewer loads `/manus-storage/bmw_m4_competition_m_package_aaa37e83.glb`, uploaded to managed web storage. The model is the BMW M4 Competition M Package by SRT Performance™, distributed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The in-app viewer includes the attribution line. The GLB contains separate exported mesh objects grouped under `BodyParts_1` and `WHeelsandrims_2`; the viewer maps those real meshes into body, doors, hood, engine, chassis, and wheel animation groups.

For external hosting, the managed `/manus-storage/` path is not automatically available on Vercel, Netlify, or Render. Mirror the GLB into the external provider’s object storage or public asset directory, update `MODEL_URL` in `client/src/components/ExplodedViewer.tsx`, and retain the attribution line and this license notice. Use a CDN or object-storage URL for the 22 MB model rather than embedding it in JavaScript.

## Manus hosting

Use the project Management UI’s checkpoint and Publish flow. The managed web-storage path is already wired for the GLB, and the server, database, and authentication environment are supplied by the project runtime.

## Vercel

Vercel is suitable for the client if the server is deployed separately. For a single full-stack deployment, configure the project as a Node server rather than a static export, set the build command to `pnpm build`, and the start command to `pnpm start`. Provide the required database, OAuth, JWT, storage, and analytics environment variables. Host the GLB in Vercel Blob, S3-compatible storage, or another public CDN and update `MODEL_URL`.

## Netlify

Netlify can serve the Vite client with `pnpm build` and publish directory `dist/public`, but the Express/tRPC server and database must be hosted separately through Netlify Functions or another Node host. Configure SPA fallback routing to `/index.html`, provide the client API base URL, host the GLB in Netlify Large Media or object storage, and update `MODEL_URL` to the resulting public URL.

## Render

Render is the most direct external option for the full-stack application. Create a Web Service, use `pnpm install --frozen-lockfile && pnpm build` as the build command, and `pnpm start` as the start command. Render injects `PORT`; the server already honors it. Configure all required environment variables and store the GLB on an object-storage/CDN URL, then update `MODEL_URL` before building.

## Release checklist

Run `pnpm check`, `pnpm test -- --run`, and `pnpm build`. Confirm that the deployed host can fetch the GLB with a successful CORS-enabled HTTP response, that the vehicle detail page can render the loading/error fallback, and that mobile controls remain separated from the canvas labels. Keep the Creative Commons attribution visible wherever the model is deployed.
