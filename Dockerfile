# AURA PRODUCTION DOCKERFILE
# Purpose: Persistent 24/7 Telegram Bot & RAG Agent

FROM node:20-slim

WORKDIR /app

# Install dependencies for Node
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Environment Variables will be set in the Cloud Provider UI (Render/Railway)
# But we ensure we skip Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Start the bot worker
CMD ["npm", "run", "bot:prod"]
