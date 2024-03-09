import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorator';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UsePipes(new ValidationPipe())
  @Post('upload-image')
  @Auth()
  @UseInterceptors(FileInterceptor('files'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    const url = await this.filesService.uploadImage(file, folder);

    return url;
  }
}
