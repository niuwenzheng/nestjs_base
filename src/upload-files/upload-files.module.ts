import { Module } from '@nestjs/common';
import { UploadFilesController } from './upload-files.controller';
import { UploadFilesService } from './upload-files.service';

@Module({
  controllers: [UploadFilesController],
  providers: [UploadFilesService]
})
export class UploadFilesModule {}
