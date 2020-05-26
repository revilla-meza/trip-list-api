# build
FROM node:12-stretch AS build

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

FROM node:12-stretch AS prod

COPY --chown=node:node --from=build /home/node/code/dist ./dist

COPY --chown=node:node --from=build /home/node/code/package-lock.json /home/node/code/package.json ./

RUN npm install --production

CMD ["node", "./dist"]