import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { UploadHandler } from 'src/common/integrations/bucket/command/upload/upload.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [FilesController],
  providers: [FilesService, UploadHandler],
})
export class FilesModule {}
