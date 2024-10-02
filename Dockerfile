FROM node:20-bookworm-slim AS base

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN npm install --omit-dev

FROM prod-deps AS builder
ARG POSTGRES_URI

RUN rm -rf "app/test"
RUN npm install
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production

COPY --chown=node:node --from=prod-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/package.json ./

USER node

EXPOSE 3000
CMD ["npm", "run", "start"]
