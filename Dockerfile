FROM nginx:alpine

ENV HOST=localhost

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/revenda/ .