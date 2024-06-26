import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Roles } from 'src/role/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getProductBySlug(slug);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
