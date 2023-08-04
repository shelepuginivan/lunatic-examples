# HTTPS

Example of https server.

## Features

- Running one application on 2 ports
- http server
- https server

## How to run

To run https server, you have to sign SSL sertificate. You can do it with [openssl](https://www.openssl.org/):

```shell
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

*Note that browser probably won't accept self-signed certificates by default. To enable it, you have to import SSL certificate to the browser and enable it. If you are using [Postman](https://www.postman.com/), you can disable certificate validation.*

Then run application:

```shell
npm install
npm run build
npm start
```

- HTTP server will be started on http://localhost:8080/
- HTTPS server will be started on https://localhost:8443/

