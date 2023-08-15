export const DETECT_FACE_PORT = Symbol('DETECT_FACE_PORT');
export interface IDetectFacePort {
  execute(imageUrl: string): Promise<Buffer>;
}
