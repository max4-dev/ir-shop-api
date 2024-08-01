import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorator';
import { FilesService } from './files.service';
import { Roles } from 'src/role/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UsePipes(new ValidationPipe())
  @Post('upload-image')
  // @Roles('ADMIN')
  // @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    const url = await this.filesService.uploadImage(file, folder);

    return url;
  }
}
