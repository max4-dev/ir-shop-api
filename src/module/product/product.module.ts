import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { ReviewSchema } from '../review/schema/review.schema';
import { PaginationModule } from '../pagination/pagination.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Products', schema: ProductSchema },
      { name: 'Reviews', schema: ReviewSchema },
    ]),
    PaginationModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
