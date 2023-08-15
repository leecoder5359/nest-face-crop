FROM node:18-alpine

RUN apk add --update tzdata
ENV TZ=Asia/Seoul

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make build-base cairo-dev pango-dev libjpeg-turbo-dev giflib-dev librsvg-dev pixman-dev

RUN apk --no-cache add pkgconfig

RUN mkdir -p /var/app

WORKDIR /var/app

COPY . .

RUN npm install --silent

RUN npm run build

CMD ["npm", "run", "start:prod"]
