FROM node:latest as react-builder
WORKDIR /react
COPY ./react/package.json /react
RUN npm update
RUN npm install
COPY ./react /react/
RUN npm run build

FROM nginx:latest

# RUN rm /etc/nginx/sites-enabled/default
COPY --from=react-builder /react/dist /var/www/react
COPY ./nginx/nginx-setup.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./SSL ../SSL
EXPOSE 443
CMD nginx -g 'daemon off;'
