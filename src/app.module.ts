import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './module/mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/category/category.module';
import { PaginationModule } from './module/pagination/pagination.module';
import { ProductModule } from './module/product/product.module';
import { FilesModule } from './module/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule,
    AuthModule,
    UserModule,
    CategoryModule,
    PaginationModule,
    ProductModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
