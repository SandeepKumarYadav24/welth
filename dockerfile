# ------------------------------
# 1️⃣ Base image — use official Node image
# ------------------------------
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (production only)
RUN npm ci --omit=dev

# ------------------------------
# 2️⃣ Build stage
# ------------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ------------------------------
# 3️⃣ Production runtime stage
# ------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package.json and build output
COPY package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Optional: non-root user for security
RUN addgroup -g 1001 nodejs
RUN adduser -D -u 1001 welthuser
USER welthuser

EXPOSE 3000
CMD ["npm", "start"]
