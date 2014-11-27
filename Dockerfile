FROM nginx
MAINTAINER emanuelpalm
COPY build/release /usr/share/nginx/html
EXPOSE 80
CMD ["nginx"]
