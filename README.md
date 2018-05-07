# Online-Tools
This project is hosted at http://tools.timodenk.com

It is a collection of web tools, such as morse to text converters, interpolation tools, hash function evaluation, to name a few. 

## Run Locally
It can be started locally using [Docker](https://www.docker.com/):
```
git clone https://github.com/Simsso/Online-Tools online-tools
cd online-tools
docker-compose build
docker-compose up
```
`docker-compose` starts an nginx container (`toolstimodenkcom_nginx_1`) that acts as a reverse proxy for the PHP FPM container (`toolstimodenkcom_fpm_1`). After startup the page is available at http://localhost:80. Note that a few tools rely on external services (which may not be available).

If you have a reverse proxy in-place and want to use the webpage solely with the PHP container, make sure to add the [nginx configuration](/conf/nginx/default.conf) block into your configuration. It will enable nicer URLs, such as http://localhost/digit-span-test rather than http://localhost/?p=digit-span-test.