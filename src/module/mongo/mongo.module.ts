import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import env from '../../common/env';

ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [MongooseModule.forRoot(env().database)],
})
export class MongoModule {}
