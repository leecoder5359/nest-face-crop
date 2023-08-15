export const FILE_DOWNLOAD_PORT = Symbol('FILE_DOWNLOAD_PORT');

export interface IFileDownloadPort {
  downloadFile(url: string): Promise<Buffer>;
}
