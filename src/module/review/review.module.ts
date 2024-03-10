import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserSchema } from '../auth/schema/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './schema/review.schema';
import { ProductSchema } from '../product/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reviews', schema: ReviewSchema },
      { name: 'Auth', schema: UserSchema },
      { name: 'Products', schema: ProductSchema },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
