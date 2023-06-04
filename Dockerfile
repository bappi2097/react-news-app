# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY . ./

# Build the Vite React project
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Serve the built project using a static file server
CMD ["yarn", "preview"]
