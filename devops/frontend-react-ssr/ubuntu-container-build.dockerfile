# Use the official Ubuntu 22.04 image as the base image
FROM ubuntu:22.04

# TODO: optimizer RUNs for fewer layers.

# Define build arguments.
ARG REPO_TOKEN
  # Required for the build image in host server approach.
ARG CONFIG_SYSTEM_REACT_PORT

# Linux - update.
RUN apt-get update
# Notes: consideration for iterations.
  # Security Updates and Best Practices:
    # RUN apt-get install -y unattended-upgrades && \
    # dpkg-reconfigure --priority=low unattended-upgrades

# Install additional packages.
RUN apt-get install -y curl git nano wget unzip gnupg jq;

# Notes: consideration for iterations.
  # Add a non-root user and switch to it
  # RUN useradd -m -d /home/node-frontend-user -s /bin/bash node-frontend-user
  # USER node-frontend-user

# Set the working directory.
# Best practices:
  # /usr/src/app: This is a common choice for application source code.
  # /opt/app: This directory is often used for optional or third-party software.
WORKDIR /usr/src/frontend-react-ssr-app
  # shell/bash (equivalent):
    # mkdir -p /usr/src/frontend-react-ssr-app
    # cd /usr/src/frontend-react-ssr-app

# Copy the application source code (build image in runner approach).
# COPY . /frontend-react-ssr-app
COPY . /usr/src/frontend-react-ssr-app

# Clone repo (built in the host server approach - poc).
# RUN git clone "https://${REPO_TOKEN}@github.com/jorge-mauricio/dockerpipelinev1nodev1dev.syncsystem.com.br.git" .
    # Validation: worked.

# Environment variables.
ENV HOME='/home'
ENV BACKEND_NODE_VERSION='12.4.0'
  # TODO: Copy from package.json file (engine)
  # jq -r '.version' package.json
  # TODO: research further
ENV NVM_DIR="$HOME/.nvm"
    # User scope.
    # TODO: switch to system-wide.
RUN mkdir -p $NVM_DIR

# Install nvm.
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Prepare nvm use.
# Export the NVM_DIR environment variable to make it available to the nvm script.
# TODO: firts line may not be needed or replace with NVM_DIR=$NVM_DIR.
RUN export NVM_DIR="$HOME/.nvm" && \
  . $NVM_DIR/nvm.sh && \
  nvm install node && \
  nvm use node && \
  npm install -g npm && \
  NODE_VERSION=$(node -p "require('./package.json').engines.node") && \
  echo "NODE_VERSION_BUILD=$NODE_VERSION" >> /tmp/env_build && \
  export NODE_VERSION_BUILD=$NODE_VERSION && \
  NPM_VERSION=$(node -p "require('./package.json').engines.npm") && \
  echo "NPM_VERSION_BUILD=$NODE_VERSION" >> /tmp/env_build && \
  export NPM_VERSION_BUILD=$NPM_VERSION && \
  nvm install $NODE_VERSION && \
  nvm use $NODE_VERSION && \
  nvm alias default $NODE_VERSION && \
  npm install -g npm@$NPM_VERSION

# Set the NODE_PATH environment variable to point to the global node_modules directory for the installed Node version.
# This allows Node.js to locate globally installed modules.
ENV NODE_PATH="$NVM_DIR/v$BACKEND_NODE_VERSION/lib/node_modules"
# Update the PATH environment variable to include the directory of the installed Node version's binaries (node, npm, etc.).
# This ensures that these binaries can be executed from any location within the container.
ENV PATH="$NVM_DIR/versions/node/v$BACKEND_NODE_VERSION/bin:$PATH"

# PM2 - install.
RUN npm install pm2 -g

# PM2 - configuration (logs rotation).
# These commands configure pm2-logrotate to limit log files to 100MB each, keep 30 old log files, and compress them to save space.
RUN pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:max_size 200M && \
    pm2 set pm2-logrotate:retain 30 && \
    pm2 set pm2-logrotate:compress true
    
# Install application dependencies
RUN npm install

# Reach application - build.
RUN npm run react-build

# PM2 - copy server config to application's root folder:
RUN cp /usr/src/frontend-react-ssr-app/devops/frontend-react-ssr/ecosystem.config.js /usr/src/frontend-react-ssr-app/ecosystem.config.js

# Expose the application port (CONFIG_SYSTEM_REACT_PORT)
# EXPOSE 3001
EXPOSE ${CONFIG_SYSTEM_REACT_PORT}

# Notes: consideration for iterations.
  # Add a health check
  # HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3001 || exit 1

# Command to start the application
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

# TODO: adjust the other dockerfile syntax and comments according to this one.
# Next step - wire up with port variable.
