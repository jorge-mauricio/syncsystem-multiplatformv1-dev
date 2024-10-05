# Use the official Ubuntu 22.04 image as the base image
FROM ubuntu:22.04

# Define build arguments.
ARG CONFIG_SYSTEM_PORT

# Set user explicitly
# USER root

# Environment variables.
# ENV HOME /home
# ENV BACKEND_NODE_VERSION 12.4.0
#   # Copy from package.json file (engine)
#   # TODO: grab the information using shell script.

#   #RUN echo home=$HOME
# # ENV NVM_DIR /usr/local/nvm
#   # Test inside container: NVM_DIR=/usr/local/nvm
#   # Evaluate using this 
# # RUN mkdir -p $NVM_DIR
# # ENV NVM_DIR="$HOME/.nvm"
# ENV NVM_DIR $HOME/.nvm
#   # TODO: evaluate using this path /usr/local/nvm
#     # For Personal or Development Environments: The default .nvm installation in a user's home directory (/home/username/.nvm) is common, as it allows individual developers to manage their Node versions without affecting others.
#     # For Shared or Production Environments: A more centralized approach might be preferred. However, instead of placing .nvm directly under /usr/local/nvm, it's more common to install Node versions system-wide without .nvm. If .nvm is used system-wide, it's typically done under a user account dedicated to managing Node versions, rather than placing it directly in a system directory.
#       # For a shared or production environment where you decide to use .nvm in a more centralized manner, you would typically set it up under a specific user account that is dedicated to managing Node versions. This approach allows you to maintain the flexibility of .nvm while avoiding the potential pitfalls of a truly system-wide installation. Here's how you might set it up:
#     # Research more.
# RUN mkdir -p $NVM_DIR
# # RUN mkdir -p $NVM_DIR && \
# #   echo $NVM_DIR
# # TODO: reveiw this - may not be needed (bacause of the RUN code below).

ENV HOME='/home'
ENV BACKEND_NODE_VERSION='12.4.0'
  # TODO: Copy from package.json file (engine)
  # jq -r '.version' package.json
  # TODO: research further
ENV NVM_DIR="$HOME/.nvm"
    # User scope.
    # TODO: switch to system-wide.
RUN mkdir -p $NVM_DIR

# Set the working directory.
WORKDIR /backend-node-app

# Copy the application source code.
COPY . /backend-node-app
# COPY . .
# TODO: exclude certain files.
# TODO: copy the ecosystem.config.js to the root.

# Debug
# RUN echo 'debug (ls /backend-node)='
# RUN ls -la /backend-node
# RUN echo 'debug (ls)='
# RUN ls -la
# RUN ls -a

# curl - install 
RUN apt-get update && apt-get install -y curl

# # Create and set up the Node.js application test
# # Create app.js
# RUN echo 'const http = require("http"); \
# const server = http.createServer((req, res) => { \
#   res.writeHead(200, { "Content-Type": "text/plain" }); \
#   res.end("Docker container working!"); \
# }); \
# const PORT = 3000; \
# server.listen(PORT, () => { \
#   console.log(`Server running at http://localhost:${PORT}/`); \
# });' > app.js

# # Create package.json
# RUN echo '{ \
#   "name": "syncsystem-docker-test", \
#   "version": "1.0.0", \
#   "engines": { \
#     "node": "12.4.0", \
#     "npm": "6.9.0" \
#   }, \
#   "description": "A simple Node.js application for testing Docker", \
#   "main": "app.js", \
#   "scripts": { \
#     "start": "node app.js" \
#   }, \
#   "keywords": [], \
#   "author": "JM - Jorge Mauricio", \
#   "license": "MIT", \
#   "dependencies": { \
#     "http": "0.0.0" \
#   } \
# }' > package.json

# Install nvm
# RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# RUN . $NVM_DIR/nvm.sh

# Prepare nvm use
# RUN export NVM_DIR="$HOME/.nvm" && \
#   [ -s "$NVM_DIR/nvm.sh" ] && \
#   . "$NVM_DIR/nvm.sh" && \
#   [ -s "$NVM_DIR/bash_completion" ] && \
#   . "$NVM_DIR/bash_completion"
  
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
  # export NODE_PATH="$NVM_DIR/v$NODE_VERSION/lib/node_modules" && \
  # export PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH" && \
  # npm install && \
  # npm start
 
 
# RUN nvm install node && \
#   nvm use node && \
#   npm install -g npm && \
#   NODE_VERSION=$(node -p "require('./package.json').engines.node") && \
#   echo "NODE_VERSION_BUILD=$NODE_VERSION" > /tmp/env_build && \
#   NPM_VERSION=$(node -p "require('./package.json').engines.npm") && \
#   echo "NPM_VERSION_BUILD=$NODE_VERSION" > /tmp/env_build && \
#   nvm install $NODE_VERSION && \
#   nvm use $NODE_VERSION && \
#   nvm alias default $NODE_VERSION && \
#   npm install -g npm@$NPM_VERSION
 
  
# RUN export NVM_DIR="$HOME/.nvm"
# # RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# RUN ["/bin/bash", "-c", "[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\""]
#   # This loads nvm
# # RUN [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# RUN ["/bin/bash", "-c", "[ -s \"$NVM_DIR/bash_completion\" ] && . \"$NVM_DIR/bash_completion\""]
#   # This loads nvm bash_completion

# Gemini
# RUN echo "export NVM_DIR="$HOME/.nvm"" >> ~/.bashrc
# RUN echo "[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"" >> ~/.bashrc
# # RUN echo "export PATH="$HOME/.nvm/versions/node/v16.14.2/bin:$PATH"" >> ~/.bashrc


# Source nvm script
# RUN /bin/bash -i -c "source /root/.nvm/nvm.sh"
  # Did't seem to work - investigate further
# RUN /bin/bash -i -c "source $NVM_DIR/nvm.sh"
  # bash
  # didn't test
# RUN . $NVM_DIR/nvm.sh
  # shell
  # did't work
  

# RUN source /root/.nvm/nvm.sh 
  # Works manually running inside the container
# RUN . /root/.nvm/nvm.sh


# Install Node.js and npm using nvm
# RUN nvm install node
# RUN nvm use node

# Install global npm packages
# RUN npm install -g npm

# Set Node.js and npm versions based on package.json
# RUN NODE_VERSION=$(node -p "require('./package.json').engines.node") && \
#     NPM_VERSION=$(node -p "require('./package.json').engines.npm") && \
#     nvm install $NODE_VERSION && \
#     nvm use $NODE_VERSION && \
#     nvm alias default $NODE_VERSION && \
#     npm install -g npm@$NPM_VERSION

ENV NODE_PATH $NVM_DIR/v$BACKEND_NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$BACKEND_NODE_VERSION/bin:$PATH

# ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
# ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
# ENV NODE_PATH "$NODE_VERSION_BUILD"
# ENV NPM_VERSION_BUILD "$NPM_VERSION_BUILD"
# ENV NODE_PATH $NVM_DIR/v$NODE_VERSION_BUILD/lib/node_modules
# ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION_BUILD/bin:$PATH
# ENV NODE_PATH $NVM_DIR/v$(cat /tmp/env_build | grep NODE_VERSION_BUILD | cut -d= -f2)/lib/node_modules
# ENV PATH      $NVM_DIR/versions/node/v$(cat /tmp/env_build | grep NODE_VERSION_BUILD | cut -d= -f2)/bin:$PATH
  # didn't work
# RUN NODE_VERSION_BUILD=$(cat /tmp/env_build | grep NODE_VERSION_BUILD | cut -d= -f2) && \
#     export NVM_DIR="/root/.nvm" && \
#     export NODE_PATH="$NVM_DIR/v$NODE_VERSION_BUILD/lib/node_modules"
  # Didn't test
    
# RUN echo NODE_PATH=$NODE_PATH && \
#   echo PATH=$PATH
  # Debug
  
# COPY /tmp/env_build /tmp/env_build
# ENV TEMP_VAR=$(cat /tmp/env_build)
# ENV SOME_VARIABLE $TEMP_VAR
# RUN echo $SOME_VARIABLE
  
# ENV NODE_VERSION_BUILD_TEST=$(cat /tmp/env_build | cut -d= -f2)
# ENV NODE_VERSION_BUILD_TEST=$(cat /tmp/env_build)
# ENV NODE_VERSION_BUILD_TEST=$(cat /tmp/env_build | grep NODE_VERSION_BUILD | cut -d= -f2)
# RUN echo $NODE_VERSION_BUILD_TEST

# PM2 - install.
RUN npm install pm2 -g

# PM2 - configuration (logs rotation).
# These commands configure pm2-logrotate to limit log files to 100MB each, keep 30 old log files, and compress them to save space.
RUN pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:max_size 200M && \
    pm2 set pm2-logrotate:retain 30 && \
    pm2 set pm2-logrotate:compress true

# RUN pm2 set pm2-logrotate:max_size 200M // Rotate logs when they reach 100MB
# RUN pm2 set pm2-logrotate:retain 30 // Keep 10 rotated logs
# RUN pm2 set pm2-logrotate:compress true // Compress (gzip) rotated logs

# PM2 - Create ecosystem.config.js file (testing - TODO: replace with devops\backend-node\ecosystem.config.js file).
# RUN echo 'module.exports = { \
#   apps : [{ \
#     name: "syncsystem-multiplatform-backend-node", \
#     script: "app.js", \
#     instances: "max", \
#     autorestart: true, \
#     watch: false, \
#     max_memory_restart: "1G", \
#     env: { \
#       NODE_ENV: "development" \
#     }, \
#     env_production: { \
#       NODE_ENV: "production" \
#     } \
#   }] \
# };' > ecosystem.config.js

# Install application dependencies
RUN npm install

# Expose the application port (CONFIG_SYSTEM_PORT)
# TODO: wire up with env.
# EXPOSE 3000
EXPOSE ${CONFIG_SYSTEM_PORT}

# Command to start the application
# With package.json.
# CMD ["npm", "start"]

# With PM2.
# CMD ["pm2-runtime", "start", "app.js"]
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
