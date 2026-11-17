# ==============================================================================
# WeCrew Technologies Private Limited
# Enterprise Production Multi-Stage Dockerfile (React + Vite + Nginx Alpine)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Environment
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies deterministically
RUN npm ci

# Copy all source files and assets
COPY . .

# Build production bundle with TypeScript type-checking and Vite bundling
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Web Server
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built distribution assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA fallback, gzip, and security headers
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose standard web ports
EXPOSE 80

# Health check to ensure Nginx is actively responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
