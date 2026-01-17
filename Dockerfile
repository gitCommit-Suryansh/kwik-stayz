# ---------- BASE ----------
FROM node:20-bullseye AS base
WORKDIR /app

# ---------- DEPENDENCIES ----------
FROM base AS deps
COPY package.json ./
RUN npm install

# ---------- BUILD ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- RUNNER ----------
FROM node:20-bullseye AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
