import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ICategory } from './interface/category.interface';
import { CategoryDto } from './dto/category.dto';
import { slugify } from 'transliteration';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categorySchema: Model<ICategory>,
  ) {}

  async getCategoryById(id: string) {
    const category = await this.categorySchema
      .findOne({
        id,
      })
      .exec();
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    return category;
  }

  async getAll() {
    return this.categorySchema.find().exec();
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.categorySchema
      .findOne({
        slug,
      })
      .exec();
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    return category;
  }

  async create() {
    try {
      const category = await new this.categorySchema({
        id: uuidv4(),
        name: '',
        slug: '',
      }).save();

      return category;
    } catch (error: unknown) {
      return null;
    }
  }

  async update(id: string, dto: CategoryDto) {
    const updatedCategory = await this.categorySchema
      .findOneAndUpdate(
        { id },
        {
          name: dto.name,
          slug: slugify(dto.name),
        },
      )
      .exec();

    if (!updatedCategory) {
      throw new NotFoundException('Категория не найдена');
    }

    return updatedCategory;
  }

  async delete(id: string) {
    const deletedCategory = await this.categorySchema
      .findOneAndDelete({ id })
      .exec();

    if (!deletedCategory) {
      throw new NotFoundException('Категория не найдена');
    }

    return deletedCategory;
  }
}
