import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slugify } from 'transliteration';
import { v4 as uuidv4 } from 'uuid';
import { ProductDto } from './dto/product.dto';
import { IProduct } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private productSchema: Model<IProduct>,
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
    return (await this.productSchema.find()).reverse();
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

  async create(dto: ProductDto) {
    try {
      const priceWithSale = this.calcPriceWithSale(dto.price, dto.salePercent);
      const product = await new this.productSchema({
        id: uuidv4(),
        slug: slugify(dto.title),
        priceWithSale,
        ...dto,
      }).save();

      return product;
    } catch (error: unknown) {
      return null;
    }
  }

  async update(id: string, dto: ProductDto) {
    const priceWithSale = this.calcPriceWithSale(dto.price, dto.salePercent);

    const updatedProduct = await this.productSchema.findOneAndUpdate(
      { id },
      {
        slug: slugify(dto.title),
        priceWithSale: priceWithSale,
        ...dto,
      },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Продукт не найден');
    }

    return updatedProduct;
  }

  async delete(id: string) {
    const deletedProduct = await this.productSchema
      .findOneAndDelete({ id })
      .exec();

    if (!deletedProduct) {
      throw new NotFoundException('Продукт не найден');
    }

    return { product: deletedProduct };
  }

  private calcPriceWithSale(price: number, salePercent: number) {
    return Math.ceil(price - price * (salePercent / 100));
  }
}
