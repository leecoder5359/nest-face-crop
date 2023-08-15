import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IFileDownloadPort } from 'src/core/ports/out/file-download.port';

@Injectable()
export class FileDownloadAdapter implements IFileDownloadPort {
  async downloadFile(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  }
}
