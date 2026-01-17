# ----------- BASE -----------
FROM node:20-alpine AS base
WORKDIR /app

# ----------- DEPENDENCIES -----------
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ----------- BUILD -----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ----------- RUNNER -----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy only required files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 5000

CMD ["node", "server.js"]
