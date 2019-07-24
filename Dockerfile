FROM node:10-alpine as node

WORKDIR /app

ENV API=""

ADD package*.json ./app

RUN npm i

COPY . ./app

RUN ng build --prod --build-optimizer


FROM nginx:alpine
ENV HOST=""
COPY --from=node /app/dist/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
