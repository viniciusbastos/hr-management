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
COPY --from=prod ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]