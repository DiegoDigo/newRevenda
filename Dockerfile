FROM node:10-alpine as node

WORKDIR /app

ADD package*.json ./app

RUN npm set progress=false && \\
    npm config set depth 0 && \\
    npm cache clean --force && \\
    npm i

COPY . ./app

RUN $(npm bin)/ng build --prod --build-optimizer


FROM nginx:alpine
ENV HOST
ENV API
COPY --from=node /app /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
