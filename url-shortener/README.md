# Url Shortener

## Features

- Pug integration
- Redis
- Redirects

## How to run

Start Redis:

```shell
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

Start application:

```shell
npm install
npm run build
npm start
```

If you want to specify different host or port, create .env file and edit it:

```shell
cp .env.example .env
nvim .env
```
