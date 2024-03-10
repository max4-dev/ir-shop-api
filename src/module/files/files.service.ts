import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import env from 'src/common/env';
import { CommandBus } from '@nestjs/cqrs';
import { UploadCommand } from 'src/common/integrations/bucket/command/upload/upload.command';
import sharp from 'sharp';

@Injectable()
export class FilesService {
  constructor(private readonly commandBus: CommandBus) {}

  async uploadImage(file: Express.Multer.File, folder: string) {
    if (!folder) {
      throw new BadRequestException('Укажите сущность для сохранения');
    };

    if (!file) {
      throw new BadRequestException('Файл не найден');
    };

    const fileName = 'file_' + uuidv4();

    try {
      const webP = await this.convertToWebP(file.buffer, 100);

      const resWebP = await this.commandBus.execute(
        new UploadCommand(
          webP,
          `images/${folder}/${fileName}.webp`,
          'image/webp',
        ),
      );

      // const res = await this.commandBus.execute(
      //   new UploadCommand(
      //     file.buffer,
      //     `images/${folder}/${fileName}.${file.originalname.split('.').at(-1)}`,
      //     file.mimetype
      //   ));

      return {
        urls: {
          // original: env().bucket.s3 + res.data.fileName,
          webP: env().bucket.s3 + resWebP.data.fileName,
        },
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  public async convertToWebP(image: Buffer, quality: number) {
    let container = this.init(image);
    container = container.webp({ quality });
    const webPImage = await this.toBuffer(container);
    return webPImage;
  }

  private init(image: Buffer) {
    return sharp(image);
  }

  private async toBuffer(container: sharp.Sharp): Promise<Buffer> {
    return container.toBuffer();
  }
}
