import {
  ArrayMinSize,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString({ each: true })
  @ArrayMinSize(0)
  images: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  categories: string;

  @IsBoolean()
  inStock: boolean;

  @IsNumber()
  salePercent: number;
}
