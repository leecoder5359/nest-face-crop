<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">API with Face Detection and Crop Functionality</h1>

<div align="center">
<img class="image" src="img_1.png" alt="Image A" />
<img class="image" src="img.png" alt="Image B" />
</div>

<p align="center">
  <strong>API equipped with face detection and crop function using NEST framework.</strong>
</p>

Contents
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Docker](#docker)

## Installation

Before you begin, make sure you have the following dependencies installed:

```
$ brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

Then, install the project dependencies:

```
$ npm install
```

## Running the App

Choose one of the following commands to run the app:

```
$ npm run start

$ npm run start:dev

$ npm run start:prod
```
## Docker

To run the app using Docker, you can follow these steps:

```
$ docker-compose up --build -d
```

The app should now be accessible at http://localhost:3000.
