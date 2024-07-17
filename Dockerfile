FROM node:18-alpine as build-fe

WORKDIR /frontend/

COPY ./frontend/ /frontend
# COPY ./frontend/public/ /frontend/public
# COPY ./frontend/src/ /frontend/src
# COPY ./frontend/package*.json /frontend

# npm build assumes directory /backend/pb_public exists
RUN mkdir ../backend
RUN mkdir ../backend/pb_public

RUN npm install
RUN npm run build


FROM alpine:latest

ARG PB_VERSION=0.22.17

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
COPY ./backend/pb_migrations /pb/pb_migrations
COPY --from=build-fe /backend/pb_public /pb/pb_public

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 80

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:80"]
