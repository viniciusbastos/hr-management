FROM node:24-bookworm-slim AS build

WORKDIR /app

COPY package.json ./

RUN yarn install
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm run build

FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3003

ENTRYPOINT ["nginx", "-g", "daemon off;"]