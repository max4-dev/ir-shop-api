import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadCommand } from './upload.command';
import B2 from 'backblaze-b2';
import env from 'src/common/env';

function authB2() {
  return new B2({
    applicationKeyId: env().bucket.keyId,
    applicationKey: env().bucket.key,
  });
}

@CommandHandler(UploadCommand)
export class UploadHandler implements ICommandHandler {
  b2: any;

  constructor() {
    this.b2 = authB2();
  }

  async execute({ contentType, file, name }: UploadCommand) {
    await this.b2.authorize();

    const uploadUrl = await this.b2.getUploadUrl({ bucketId: env().bucket.id });

    return await this.b2.uploadFile({
      uploadUrl: uploadUrl.data.uploadUrl,
      uploadAuthToken: uploadUrl.data.authorizationToken,
      fileName: name,
      data: file,
    });
  }
}
