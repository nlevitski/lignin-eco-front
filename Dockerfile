FROM node:24.18.0-bookworm-slim AS base

WORKDIR /app
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# The sitemap pages read Strapi while Next.js builds. Rewrites use Docker DNS later.
ARG STRAPI_BUILD_URL=https://lignineco.com
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV STRAPI_URL=${STRAPI_BUILD_URL} \
    STRAPI_REWRITE_URL=http://lignineco-strapi:1337 \
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
RUN pnpm build

FROM node:24.18.0-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    STRAPI_URL=http://lignineco-strapi:1337

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
