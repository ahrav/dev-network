FROM node:10.16-alpine as base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm config list \
  && npm ci \
  && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH
CMD ["node", "server.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm config list
RUN npm install --only=development\
  && npm cache clean --force
CMD ["nodemon", "./bin/www"]

FROM dev as test
COPY . .
RUN npm audit
RUN npm test

FROM test as pre-prod
RUN rm -rf ./tests && rm -rf ./node_modules

FROM base as prod
COPY --from=pre-prod /app /app