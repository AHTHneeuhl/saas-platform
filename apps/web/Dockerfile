# -------- Base --------
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

# -------- Prune workspace --------
FROM base AS pruner
COPY . .
RUN npx turbo prune web --docker

# -------- Install dependencies --------
FROM base AS deps
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# -------- Build --------
FROM base AS builder
COPY --from=pruner /app/out/full/ .
COPY --from=deps /app/node_modules ./node_modules

RUN pnpm turbo run build --filter=web

# -------- Production --------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]