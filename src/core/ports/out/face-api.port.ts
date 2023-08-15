import {DetectAllFaceLandmarksTask, DetectSingleFaceLandmarksTask, FaceDetection, TNetInput} from "face-api.js";

export const FACE_API_PORT = Symbol('FACE_API_PORT');

export interface IFaceApiPort {
  cropFaceImage(imageBuffer: Buffer): Promise<Buffer>;
  detectFaceWithFaceLandMark(image: TNetInput): Promise<DetectSingleFaceLandmarksTask<{ detection: FaceDetection }>>;
  detectAllFaceWithFaceLandMark(image: TNetInput): Promise<DetectAllFaceLandmarksTask<{ detection: FaceDetection }>>;
}
