# base image
FROM --platform=amd64 node:latest as build

# set working directory
WORKDIR /app

# add `/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# generate build
RUN ng build --output-path=dist

############
### prod ###
############

# base image
FROM --platform=amd64 nginx:latest

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# add NGINX config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx /etc/nginx /var/run /run
RUN chmod -R a+w /var/run /run /var/cache /var/cache/nginx

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]