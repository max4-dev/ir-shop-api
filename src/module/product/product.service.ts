import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slugify } from 'transliteration';
import { v4 as uuidv4 } from 'uuid';
import { ProductDto } from './dto/product.dto';
import { IProduct } from './interface/product.interface';
import { IReview } from '../review/interface/review.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private productSchema: Model<IProduct>,
    @InjectModel('Reviews') private reviewSchema: Model<IReview>,
  ) {}

  async getProductById(id: string) {
    const product = await this.productSchema
      .findOne({
        id,
      })
      .exec();
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    return product;
  }

  async getAll() {
    return this.productSchema.find().exec();
  }

  async getProductBySlug(slug: string) {
    const product = await this.productSchema
      .findOne({
        slug,
      })
      .exec();
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    return product;
  }

  async create() {
    try {
      const product = await new this.productSchema({
        id: uuidv4(),
        title: '',
        salePercent: 0,
        slug: '',
        images: [],
        categories: [],
      }).save();

      return product;
    } catch (error: unknown) {
      return null;
    }
  }

  async update(id: string, dto: ProductDto) {
    const priceWithSale = dto.price - dto.price * (dto.salePercent / 100);
    const updatedProduct = await this.productSchema
      .findOneAndUpdate(
        { id },
        {
          slug: slugify(dto.title),
          priceWithSale,
          ...dto,
        },
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('Продукт не найден');
    }

    return updatedProduct;
  }

  async delete(id: string) {
    const deletedProduct = await this.productSchema
      .findOneAndDelete({ id })
      .exec();

    const deletedReviews = await this.reviewSchema
      .deleteMany({ productId: id })
      .exec();

    if (!deletedProduct) {
      throw new NotFoundException('Продукт не найден');
    }

    return { product: deletedProduct, reviews: deletedReviews };
  }
}
