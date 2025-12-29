# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
# Dependencies are only reinstalled if package.json or package-lock.json change
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# This runs TypeScript compilation and Vite build
RUN npm run build

# Stage 2: Serve the built application
FROM node:20-alpine

WORKDIR /app

# Copy package files and install only production dependencies
# 'serve' is a dependency needed to run the app
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 5173

# Use the 'serve' script from package.json to start the server
CMD ["npm", "run", "serve"]
