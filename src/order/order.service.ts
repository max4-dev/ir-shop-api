import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { IOrder } from './interface/order.interface';
import { OrderDto } from './dto/order.dto';
import { User } from 'src/module/auth/interface/user.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderSchema: Model<IOrder>,
    @InjectModel('Auth') private userSchema: Model<User>,
  ) {}

  async getAllOrders() {
    const orders = (await this.orderSchema.find()).reverse();
    return orders;
  }

  async getOrdersByUser(userId: string) {
    const user = await this.userSchema.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('Не удалось найти пользователя');
    }

    return user.orders.reverse();
  }

  async createOrder(dto: OrderDto) {
    try {
      const user = await this.userSchema.findOne({ id: dto.user.id });

      if (!user) {
        throw new BadRequestException('Не удалось найти пользователя');
      }

      const order = await new this.orderSchema({
        id: uuidv4(),
        ...dto,
      }).save();
      await user.updateOne({ $push: { orders: order } });

      return order;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateOrder(orderId: string, userId: string, dto: OrderDto) {
    const user = await this.userSchema.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('Не удалось найти пользователя');
    }

    const updatedOrder = await this.orderSchema
      .findOneAndUpdate(
        { id: orderId },
        {
          ...dto,
        },
      )
      .exec();

    if (!updatedOrder) {
      throw new BadRequestException('Заказ не найден');
    }

    const updatedOrders = user.orders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      return updatedOrder;
    });

    await user.updateOne({ orders: updatedOrders });

    return updatedOrder;
  }

  async deleteOrder(orderId: string, userId: string) {
    const user = await this.userSchema.findOne({ id: userId });

    if (!user) {
      throw new BadRequestException('Не удалось найти пользователя');
    }

    const deletedOrder = await this.orderSchema.findOneAndDelete({
      id: orderId,
    });

    if (!deletedOrder) {
      throw new BadRequestException('Заказ не найден');
    }

    const filteredOrders = user.orders.filter((order) => order.id !== orderId);

    await user.updateOne({ orders: filteredOrders });

    return deletedOrder;
  }
}
