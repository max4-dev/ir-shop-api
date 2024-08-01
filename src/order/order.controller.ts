import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/module/auth/decorators/auth.decorator';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from 'src/module/auth/decorators/user.decorator';
import { RoleGuard } from 'src/module/auth/guards/role.guard';
import { Roles } from 'src/role/decorators/role.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get('by-user')
  async getOrdersByUser(@CurrentUser('id') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createOrder(@Body() dto: OrderDto) {
    return this.orderService.createOrder(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.orderService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Query('userId') userId: string,
    @Body() dto: OrderDto,
  ) {
    return this.orderService.updateOrder(orderId, userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Delete(':id')
  async deleteOrder(
    @Param('id') orderId: string,
    @Query('userId') userId: string,
  ) {
    return this.orderService.deleteOrder(orderId, userId);
  }
}
