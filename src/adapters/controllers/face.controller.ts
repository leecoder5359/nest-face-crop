import {Controller, Post, Body, Query, Inject, Res} from '@nestjs/common';
import {DETECT_FACE_PORT, IDetectFacePort} from 'src/core/ports/in/detect-face.in-port';

@Controller('/crop-image')
export class FaceController {
  constructor(
      @Inject(DETECT_FACE_PORT)
      private readonly service: IDetectFacePort
  ) {}

  @Post()
  async detectFace(@Body() param: { imageUrl: string }): Promise<Buffer> {
    return this.service.execute(param.imageUrl);
  }

  @Post('/download')
  async downloadDetectFace(@Res() res, @Body() param: {imageUrl: string}) {
    const result = await this.service.execute(param.imageUrl);
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': result.length
    });
    res.end(result);
  }
}
