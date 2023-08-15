import { Module } from '@nestjs/common';
import { FaceController } from './adapters/controllers/face.controller';
import { CropFaceService } from './core/usecases/crop-face.service';
import { FaceApiAdapter } from './adapters/face-api/face-api.adapter';
import { FileDownloadAdapter } from './adapters/file/file-download.adapter';
import { DETECT_FACE_PORT } from './core/ports/in/detect-face.in-port';
import { FACE_API_PORT } from './core/ports/out/face-api.port';
import { FILE_DOWNLOAD_PORT } from './core/ports/out/file-download.port';

@Module({
  controllers: [FaceController],
  providers: [
    {
      provide: DETECT_FACE_PORT,
      useClass: CropFaceService,
    },
    {
      provide: FACE_API_PORT,
      useClass: FaceApiAdapter,
    },
    {
      provide: FILE_DOWNLOAD_PORT,
      useClass: FileDownloadAdapter,
    },
  ],
})
export class AppModule {}
