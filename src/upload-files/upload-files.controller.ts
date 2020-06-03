import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('upload-files')
export class UploadFilesController {
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    /* {
     * fieldname: 'file',
     * originalname: '333.png',
     * encoding: '7bit',
     * mimetype: 'image/png',
     * buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 30 00 00 00 30 08 02 00 00 00 d8 60 6e d0 00 00 0b 2d 49 44 41 54 58 c3 ed 58 6b 70 5d d5 75 ... 2868 more bytes>,
     * size: 2918
     * }
     */
    return 'UploadedFile succeed';
  }
}
