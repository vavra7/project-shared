ARG NODE_VERSION


FROM node:${NODE_VERSION} as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

COPY /packages/shared ./packages/shared
COPY /services/client ./services/client

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/shared
RUN yarn build

WORKDIR /usr/src/app/services/client
RUN yarn build



FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY --from=builder /usr/src/app/packages/shared/package.json /usr/src/app/packages/shared/package.json
COPY --from=builder /usr/src/app/packages/shared/dist /usr/src/app/packages/shared/dist

COPY --from=builder /usr/src/app/services/client/package.json /usr/src/app/services/client/package.json
COPY --from=builder /usr/src/app/services/client/.next /usr/src/app/services/client/.next
COPY --from=builder /usr/src/app/services/client/next.config.js /usr/src/app/services/client/next.config.js

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/services/client

CMD [ "yarn", "start" ]
