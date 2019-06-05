from node:10.16-alpine as builder
ENV NODE_ENV=production
WORKDIR '/app'
COPY package*.json ./
RUN npm config list \
  && npm ci \
  && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm run build


FROM builder as dev
ENV NODE_ENV=development
RUN apk update
RUN npm config list
RUN npm install --only=development\
  && npm cache clean --force
CMD ["npm", "start"]

FROM dev as test
RUN npm audit
RUN npm test

FROM test as pre-prod
RUN rm -rf ./tests && rm -rf ./node_modules
RUN npm test


FROM nginx as prod
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=pre-prod /app/build /usr/share/nginx/html