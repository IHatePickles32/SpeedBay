# Build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy client and server package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install root dependencies
RUN npm install

# Copy the entire project
COPY . .

# List contents to debug
RUN ls -la
RUN ls -la client

# Install and build client
WORKDIR /app/client
RUN npm install
RUN npm run build

# Install and build server
WORKDIR /app/server
RUN npm install
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Copy built assets
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server/package*.json ./server/

# Install production dependencies
WORKDIR /app/server
RUN npm install --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["node", "dist/index.js"] 