FROM leehojun/nest-face-detect:1.0.0

ENV TZ=Asia/Seoul

WORKDIR /var/app

COPY . .

RUN npm install --silent && \
    npm run build

# Start the application
CMD ["npm", "run", "start:prod"]
