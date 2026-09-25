# Lignin Eco frontend

Next.js frontend for `lignineco.com`. The backend is the separate `service` project.

## Local development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Start Strapi on `http://localhost:1337` first. `STRAPI_URL` selects the server-side API address; `NEXT_PUBLIC_STRAPI_URL` remains a fallback for existing local setups. In production, use `STRAPI_URL=http://lignineco-strapi:1337` on the shared Docker network.

## Docker deployment

The Compose project runs only the frontend. The `lignin` network must already exist, and the Strapi Compose project in `../service` must attach its `lignineco-strapi` service to that network. The existing Traefik project also attaches to `lignin`. Traefik discovers this frontend through Compose labels and routes `lignineco.com` to port 3000. The backend's more specific `/api`, `/uploads`, and admin routes are defined in its own Compose file.

```sh
docker network inspect lignin
docker compose up -d --build --wait
```

The sitemap pages read Strapi during the Next.js build. `STRAPI_BUILD_URL` defaults to `https://lignineco.com`, so that address must expose the backend API during each build. Set `STRAPI_BUILD_URL` in the frontend's VPS `.env` if the public API address changes. If Google Analytics is used, set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` there too; Next.js embeds that public ID at build time. Next.js records the `/api` and `/uploads` rewrite destination during the build; the Dockerfile sets it to the Strapi service's Docker hostname. The running container also uses Docker DNS for server-side API requests. The image is built with Node 24 slim and pnpm 10.15.1, then runs Next.js standalone as the unprivileged `node` user.

## GitHub Actions

The deployment workflow runs on pushes to `main` or manually. Set these repository secrets:

- `VPS_HOST`: new VPS hostname or IP address
- `VPS_USER`: SSH user with access to Docker and the deployment directory
- `VPS_SSH_KEY`: that user's private SSH key (install its public key on the VPS)
- `VPS_PATH`: frontend destination, for example `~/lignineco/front` or `/srv/lignineco/front`

The workflow uploads only this frontend repository and runs `docker compose up -d --build --wait` in `VPS_PATH`. It does not deploy the backend or shared Traefik configuration. Its `rsync --delete` removes stale files in the frontend destination, while excluding `.env*`, `.git`, build output, and dependencies. An existing destination must contain this project's `package.json`; reserve `VPS_PATH` for this frontend.
