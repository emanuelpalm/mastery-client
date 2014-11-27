FROM nginx
COPY build/release /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
