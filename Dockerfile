FROM ubuntu:16.04

# Maintainer
MAINTAINER Rodrigo Prata "rbpsilver@gmail"

ENV NGINX_VERSION 1.9.3-1~jessie

RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y curl
# node
RUN curl -sL https://deb.nodesource.com/setup_6.x
RUN apt-get install -y nodejs
# mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN apt-get clean

# NGINX
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
VOLUME ["/var/cache/nginx"]
RUN rm /etc/nginx/sites-available/default
ADD ./nginx-default /etc/nginx/sites-available/default

# BUILD
WORKDIR /var/www/html
ADD ./* /var/www/html/

EXPOSE 80 443
CMD service nginx -g "daemon off;"
CMD npm install
CMD mongod