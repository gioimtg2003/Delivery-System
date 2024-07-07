FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json*  ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.ts .
COPY .env .env

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

RUN npm run build
FROM base AS runnerrr

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}



CMD ["node", "server.js"]