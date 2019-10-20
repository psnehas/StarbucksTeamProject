FROM node:7.10.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "node", "index.js" ]
