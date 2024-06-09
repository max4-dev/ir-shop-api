import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private userSchema: Model<User>,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { phone, name, password } = dto;

    try {
      const existUser = await this.userSchema
        .findOne({
          phone: dto.phone,
        })
        .exec();

      if (existUser) {
        throw new BadRequestException(
          'Пользователь с таким телефоном уже существует',
        );
      }

      const user = await new this.userSchema({
        id: uuidv4(),
        phone,
        name,
        password: await hash(password),
      }).save();

      const tokens = await this.issueTokens(user.id);

      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    } catch (error: unknown) {
      return null;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (!user) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async validatePassword(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (!user) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    return { status: true };
  }

  private async validateUser({ phone, password }: LoginDto) {
    const user = await this.userSchema
      .findOne({
        phone,
      })
      .exec();

    if (!user) {
      throw new BadRequestException('Неверные данные');
    }

    const isValid = await verify(user.password, password);

    if (!isValid) {
      throw new BadRequestException('Неверные данные');
    }

    return user;
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = await this.jwt.signAsync(data, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwt.signAsync(data, {
      expiresIn: '2d',
    });

    return { accessToken, refreshToken };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user: User = await this.userSchema
      .findOne({
        id: result.id,
      })
      .exec();

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      phone: user.phone,
    };
  }
}
