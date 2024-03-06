import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './module/mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), MongoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
