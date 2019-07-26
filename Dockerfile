FROM node:alpine AS builder
WORKDIR /app
ADD package*.json .
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force && npm install
COPY . .
RUN npm run build --prod


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/revenda/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
