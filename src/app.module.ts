import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './module/mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule,
    AuthModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
