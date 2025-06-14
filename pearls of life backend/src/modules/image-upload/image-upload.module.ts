import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { imageUploadProvider } from './image-upload.provider';

@Module({
  providers: [
    ImageUploadService,
    ...imageUploadProvider
  ],
  exports: [
    ImageUploadService
  ]
})
export class ImageUploadModule {}
