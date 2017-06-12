FROM node:6.11-alpine


WORKDIR /app
COPY package.json /app/package.json
COPY index.js /app/index.js
COPY server /app/server

ENV SETTINGS /var/settings/settings.js

RUN cd /app && npm install

EXPOSE 8050

# Starting server
CMD node /app/index.js