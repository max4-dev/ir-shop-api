import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class PrivateUserDto {
  @IsString()
  id: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  name: string;
}

export class UserAddress {
  @IsString()
  value: string;
}
