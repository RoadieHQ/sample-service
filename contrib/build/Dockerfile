FROM node:13-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

# Bundle app source
COPY dist .

EXPOSE 3000

CMD [ "node", "index.js" ]
