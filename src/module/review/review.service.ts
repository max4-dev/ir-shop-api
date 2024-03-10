import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ReviewDto } from './dto/review.dto';
import { IReview } from './interface/review.interface';
import { User } from '../auth/interface/user.interface';
import { IProduct } from '../product/interface/product.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Reviews') private reviewSchema: Model<IReview>,
    @InjectModel('Auth') private userSchema: Model<User>,
    @InjectModel('Products') private productSchema: Model<IProduct>,
  ) {}

  async getByProduct(productId: string) {
    await this.isProductExist(productId);

    return this.reviewSchema
      .find({ productId })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getAll() {
    return this.reviewSchema.find().sort({ createdAt: 'desc' }).exec();
  }

  async create(userId: string, productId: string, dto: ReviewDto) {
    await this.isProductExist(productId);

    const user = await this.userSchema.findOne({ id: userId }).exec();

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const { name } = user;

    const review = await new this.reviewSchema({
      id: uuidv4(),
      ...dto,
      userId,
      user: { name },
      productId,
    }).save();

    return review;
  }

  async avg(productId: string) {
    await this.isProductExist(productId);

    const reviews = await this.reviewSchema.find({ productId }).exec();
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  }

  async delete(id: string) {
    const deletedReview = await this.reviewSchema
      .findOneAndDelete({ id })
      .exec();

    return deletedReview;
  }

  private async isProductExist(productId: string) {
    const product = await this.productSchema.findOne({ id: productId }).exec();
    if (!product) {
      throw new BadRequestException('Продукт не найден');
    }

    return product;
  }
}
