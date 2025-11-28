# Production Dockerfile - Multi-stage build for React + Vite

# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Build arguments for environment variables
ARG VITE_APP_VERSION
ARG VITE_MAP_STYLE_URL

ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_MAP_STYLE_URL=$VITE_MAP_STYLE_URL

RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx \
    -s /sbin/nologin -G nginx-app -g nginx-app nginx-app

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions for non-root user
RUN chown -R nginx-app:nginx-app /usr/share/nginx/html && \
    chown -R nginx-app:nginx-app /var/cache/nginx && \
    chown -R nginx-app:nginx-app /var/log/nginx && \
    chown -R nginx-app:nginx-app /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-app:nginx-app /var/run/nginx.pid

USER nginx-app

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
