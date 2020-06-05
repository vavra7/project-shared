ARG NODE_VERSION


FROM node:${NODE_VERSION} as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

COPY /packages/shared ./packages/shared
COPY /services/server ./services/server

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/shared
RUN yarn build

WORKDIR /usr/src/app/services/server
RUN yarn build



FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY --from=builder /usr/src/app/packages/shared/package.json /usr/src/app/packages/shared/package.json
COPY --from=builder /usr/src/app/packages/shared/build /usr/src/app/packages/shared/build

COPY --from=builder /usr/src/app/services/server/package.json /usr/src/app/services/server/package.json
COPY --from=builder /usr/src/app/services/server/build /usr/src/app/services/server/build

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/src/app/services/server

CMD [ "yarn", "start" ]
