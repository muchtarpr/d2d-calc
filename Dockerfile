FROM node:12.20.1-alpine3.10

# Create app directory
ENV HOME=/apps/gueordermicro/
# ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_BROWSER_MONITOR_ENABLE=true
ENV NEW_RELIC_LOG=stdout
RUN mkdir -p /apps/gueordermicro/
RUN mkdir -p /apps/gueordermicro/tmp/

WORKDIR $HOME

# Install app dependencies
RUN apk add --no-cache curl tini

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json $HOME

RUN npm i -g @nestjs/cli
RUN npm install --save

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5007

RUN rm .env

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "dist/main"]