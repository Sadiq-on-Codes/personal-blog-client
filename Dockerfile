# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your application
COPY . .

# Build the application (optional if you want to serve the built app)
RUN yarn build

# Expose the port Vite runs on (default is 5173)
EXPOSE 5173

# Start the Vite server
CMD ["yarn", "dev"]
