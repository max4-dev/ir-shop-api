import { ArrayMinSize, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IProduct } from 'src/module/product/interface/product.interface';
import { PrivateUserDto, UserAddress } from 'src/module/user/dto/user.dto';
import { IPrivateUser } from 'src/module/user/interface/user.interface';

export class OrderDto {
  @IsString()
  status: string;

  @IsNumber()
  price: number;

  @IsNumber()
  count: number;

  @ArrayMinSize(1)
  products: IProduct[];

  @Type(() => UserAddress)
  address: unknown;

  @Type(() => PrivateUserDto)
  user: IPrivateUser;
}
