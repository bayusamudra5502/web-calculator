FROM httpd:2.4
EXPOSE 8080

COPY . /usr/local/apache2/htdocs/