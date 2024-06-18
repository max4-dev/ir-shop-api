import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { RoleGuard } from 'src/module/auth/guards/role.guard';
import { Roles } from './decorators/role.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  async getAll() {
    return this.roleService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':value')
  async getByValue(@Param() value) {
    return this.roleService.getByValue(value);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() dto: RoleDto) {
    return this.roleService.create(dto);
  }
}
