FROM node:13.14 as builder
WORKDIR /server

COPY package.json ./
COPY yarn.lock ./
COPY /packages/shared ./packages/shared

RUN ls

WORKDIR /server/packages/shared
RUN ls

