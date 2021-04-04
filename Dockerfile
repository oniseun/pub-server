
FROM node:12.13-alpine As development
WORKDIR /usr/src/pub-server
RUN mkdir -p /logs
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install -g pm2
# Bundle app source
COPY . .

EXPOSE 8000
USER appuser
CMD pm2 start src/server.js -i max --no-daemon --name app -o /logs/out.log -e /logs/err.log