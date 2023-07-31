# ⑨ API

Thanks to [@Nikilireous](https://github.com/Nikilireous) for the idea and help in development

## Features

- Many response formats (HTML, XML, JSON, SVG and more)
- Cookies

## How to run

```shell
npm install
npm run build
npm start
```

Then open your favorite URL client and make a request.

## Endpoints

>All endpoints accepts same query parameters:
>
>- q - user question
>- hl - (optional) locale (currently supported 'en' and 'ru')

1. `/api/html` - HTML response
2. `/api/image` - PNG response
3. `/api/json` - JSON response
4. `/api/svg` - SVG response
5. `/api/text` - Text response
6. `/api/xml` - XML response

### Example

http://localhost:8000/api/image?q=Do%20you%20like%20math

