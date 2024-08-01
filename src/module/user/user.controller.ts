import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/module/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/module/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { Roles } from 'src/role/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Get('role')
  @Auth()
  async checkRole(@CurrentUser('id') userId: string) {
    return this.userService.checkRole(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
