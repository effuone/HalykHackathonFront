# FROM node:18-alpine AS builder
# RUN apk update && yarn global add turbo
# # Set working directory
# WORKDIR /app
# COPY . .
# # Only Take packages that are needed to compile this app
# RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
# FROM node:18-alpine AS installer
# RUN apk update && apk add --no-cache libc6-compat
# WORKDIR /app
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
# COPY --from=builder /app/turbo.json ./turbo.json
# RUN yarn install --frozen-lockfile


# FROM node:18-alpine AS sourcer
# WORKDIR /app
# COPY --from=installer /app/ .
# COPY --from=builder /app/out/full/ .
# COPY .gitignore .gitignore
# RUN yarn turbo run build --scope=web --include-dependencies --no-deps

# FROM node:18-alpine as runner
# WORKDIR /app
# COPY --from=sourcer /app/ .
# WORKDIR /app/apps/web/
# CMD [ "npm", "start" ]

# FROM nginx:latest as runner
# WORKDIR /var/www

# COPY apps/web/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY apps/web/nginx/mime.types /etc/nginx/mime.types
# COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY --from=sourcer /app/apps/web/dist .
# EXPOSE 80

FROM node:18-alpine AS base

FROM base AS general
RUN apk update && yarn global add turbo
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker

FROM base as installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=general /app/out/yarn.lock ./yarn.lock
COPY --from=general /app/out/full/apps/web/package.json ./package.json
RUN yarn install --frozen-lockfile

COPY --from=general /app/out/full/apps/web .
RUN yarn build

FROM nginx:alpine as runner
WORKDIR /var/www
COPY apps/web/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/web/nginx/mime.types /etc/nginx/mime.types
COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/dist .
EXPOSE 80