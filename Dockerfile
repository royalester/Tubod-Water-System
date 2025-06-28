# # Use official Node image
# FROM node:18

# # Install Expo CLI globally
# RUN npm install -g expo-cli

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app
# COPY . .

# # Expose Expo dev ports
# EXPOSE 19000 19001 19002

# # Start Expo
# CMD ["npx", "expo", "start", "--tunnel"]

# Dockerfile

FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies (installs local expo CLI too)
RUN npm install

# Copy project files
COPY . .

# Start Expo using local CLI
CMD ["npx", "expo", "start", "--tunnel"]


