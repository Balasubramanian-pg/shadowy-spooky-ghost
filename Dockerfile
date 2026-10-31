# ========================================================
# Stage 1: Build Environment
# ========================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies with frozen lockfile
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Build production distribution
RUN npm run build

# ========================================================
# Stage 2: Production Ng