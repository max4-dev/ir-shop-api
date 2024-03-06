import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/module/auth/schema/auth.schema';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Auth', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
