import { forwardRef, Module } from '@nestjs/common';
import { MemoriesController } from './memories.controller';
import { MemoriesService } from './memories.service';
import { memoryFolderProvider } from './memories.provider';
import { ImageUploadModule } from '../image-upload/image-upload.module';

@Module({
  controllers: [MemoriesController],
  providers: [MemoriesService, ...memoryFolderProvider],
  imports: [forwardRef(() => ImageUploadModule)]
})
export class MemoriesModule { }
