FROM node:21-alpine as prod
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
# Production stage
FROM nginx:alpine
WORKDIR /usr/local/bin

COPY --from=prod /app/dist /usr/share/nginx/html
COPY generate-config.sh .

COPY custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]
