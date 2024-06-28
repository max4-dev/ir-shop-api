import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'argon2';
import { Model } from 'mongoose';
import { User } from 'src/module/auth/interface/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('Auth') private userSchema: Model<User>) {}

  async getUserById(id: string) {
    const user = await this.userSchema
      .findOne({
        id,
      })
      .exec();
    if (!user) {
      throw new HttpException('Пользователь не найден', 405);
    }
    const { phone, name } = user;
    return { id, phone, name };
  }

  async updateProfile(id: string, dto: UserDto) {
    const isSameUser = await this.userSchema
      .findOne({
        phone: dto.phone,
      })
      .exec();

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Этот номер телефона уже используется');
    }

    const user = await this.userSchema
      .findOne({
        id,
      })
      .exec();

    const updatedUser = await this.userSchema
      .findOneAndUpdate(
        { id },
        {
          ...dto,
          password: dto.password ? await hash(dto.password) : user.password,
        },
      )
      .exec();

    return updatedUser;
  }

  async checkRole(userId: string) {
    const user = await this.userSchema
      .findOne({
        id: userId,
      })
      .exec();

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    return user.role;
  }
}
