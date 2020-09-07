# Build container
FROM node:12-alpine as builder
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install  --frozen-lockfile

COPY src ./src/
# COPY typings ./typings/
# COPY migration ./migration/
COPY *.js* ./
RUN yarn build

# Image container
FROM node:12-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 8080
CMD ["yarn", "start"]

