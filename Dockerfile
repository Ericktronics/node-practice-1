# FROM node:20-alpine

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy source files
# COPY . .

# # Build TypeScript
# RUN npm run build

# # Expose port
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]