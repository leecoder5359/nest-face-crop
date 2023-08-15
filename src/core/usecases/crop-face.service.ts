import { Inject, Injectable } from '@nestjs/common';
import { IDetectFacePort } from '../ports/in/detect-face.in-port';
import { FACE_API_PORT, IFaceApiPort } from '../ports/out/face-api.port';
import {
  FILE_DOWNLOAD_PORT,
  IFileDownloadPort,
} from '../ports/out/file-download.port';

@Injectable()
export class CropFaceService implements IDetectFacePort {
  constructor(
    @Inject(FACE_API_PORT)
    private readonly faceApiPort: IFaceApiPort,
    @Inject(FILE_DOWNLOAD_PORT)
    private readonly fileDownloadPort: IFileDownloadPort,
  ) {}

  async execute(imageUrl: string): Promise<Buffer> {
    const imageBuffer = await this.fileDownloadPort.downloadFile(imageUrl);
    return this.faceApiPort.cropFaceImage(imageBuffer);
  }
}
