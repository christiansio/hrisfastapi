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
COPY package*.json ./
RUN npm install --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy the script from your host to the container
COPY generate-env.sh /app/generate-env.sh

# Make it Executable
RUN chmod +x /app/generate-env.sh

# generate env with the URL
RUN /app/generate-env.sh

EXPOSE 5173

# Use npm script instead of global serve
CMD ["npm", "run", "serve"]
