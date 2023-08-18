<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">API with Face Detection and Crop Functionality</h1>

<p align="center">
  <img src="img_1.png" alt="Face Detection Example" />
</p>

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

1. Build the Docker image:
```
$ docker build -t your-image-name
```


2. Run the Docker container:

```
$ docker run -p 3000:3000 -d your-image-name
```

The app should now be accessible at http://localhost:3000.
