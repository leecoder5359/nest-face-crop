import {Injectable} from '@nestjs/common';
import {
  createCanvasFromMedia,
  DetectAllFaceLandmarksTask,
  detectAllFaces,
  detectSingleFace,
  DetectSingleFaceLandmarksTask, DetectSingleFaceTask,
  env,
  FaceDetection,
  nets,
  Point,
  TinyFaceDetectorOptions,
  TNetInput,
  WithFaceLandmarks,
} from 'face-api.js';
import * as faceApi from 'face-api.js';
import {IFaceApiPort} from '../../core/ports/out/face-api.port';
import {join} from 'path';
import {read, MIME_JPEG} from 'jimp';

@Injectable()
export class FaceApiAdapter implements IFaceApiPort {
  private _canvas: any;
  private faceDetectorOptions: TinyFaceDetectorOptions;

  constructor() {
    this.faceDetectorOptions = new TinyFaceDetectorOptions({
      scoreThreshold: 0.5,
      inputSize: 512,
    });
    this.initFaceAPI();
  }

  async initFaceAPI() {
    this._canvas = require('canvas');

    const { Canvas, Image, ImageData } = this._canvas;
    env.monkeyPatch({ Canvas, Image, ImageData });


    console.log('__dirname',join(__dirname, '../../..', 'models'));

    await Promise.all([
      nets.tinyFaceDetector.loadFromDisk(join(__dirname, '../../..', 'models')),
      nets.faceLandmark68TinyNet.loadFromDisk(join(__dirname, '../../..', 'models')),
      // nets.faceRecognitionNet.loadFromDisk(join(__dirname, '../../..', 'models')),
      // nets.faceLandmark68Net.loadFromDisk(join(__dirname, '../../..', 'models'))
    ]);
  }

  async cropFaceImage(imageBuffer: Buffer): Promise<Buffer> {
    const image = await this._canvas.loadImage(imageBuffer);
    const htmlCanvasElement = await createCanvasFromMedia(image);
    console.time("detectFace");
    const hasFace = await this.detectFaceWithFaceLandMark(htmlCanvasElement);
    console.timeEnd("detectFace");

    if (hasFace) {
      console.log('얼굴이 감지되었습니다.');
      const nosePosition: Point[] = await this.getNosePosition(hasFace);
      const fixedNoisePoint: number = Math.max(...nosePosition.map((point) => point.y));
      return await this.cropImage(imageBuffer, fixedNoisePoint);
    }

    console.log('얼굴이 감지되지 않았습니다.');
    return imageBuffer;
  }

  async detectAllFaceWithFaceLandMark(
    image: TNetInput,
  ): Promise<DetectAllFaceLandmarksTask<{ detection: FaceDetection }>> {
    return detectAllFaces(image, this.faceDetectorOptions).withFaceLandmarks(true);
  }

  async detectFaceWithFaceLandMark(
      image: TNetInput,
  ): Promise<DetectSingleFaceLandmarksTask<{ detection: FaceDetection }>> {
      return detectSingleFace(image, this.faceDetectorOptions).withFaceLandmarks(true);
  }

  async detectFace(
      image: TNetInput,
  ): Promise<DetectSingleFaceTask> {
    return detectSingleFace(image, this.faceDetectorOptions);
  }



  //첫번째 얼굴( 사람 한명만 인식하도록 함 )
  async getNosePosition(
    face: WithFaceLandmarks<{ detection: FaceDetection }>,
  ): Promise<Point[]> {
    return face.landmarks.getNose();
  }

  async cropImage(imageBuffer: Buffer, noseYPosition: number): Promise<Buffer> {
    const jimpImage = await read(imageBuffer);
    const croppedImage = await jimpImage.crop(0, noseYPosition, jimpImage.getWidth(), jimpImage.getHeight() - noseYPosition,).quality(70);
    return croppedImage.getBufferAsync(MIME_JPEG); // MIME_JPEG 대신 다른 형식을 사용할 수 있습니다.;
  }
}
