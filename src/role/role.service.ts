import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './interface/role.interface';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleSchema: Model<Role>) {}

  async getAll() {
    const roles = await this.roleSchema.find().exec();
    return roles;
  }

  async getByValue(value: string) {
    const role = await this.roleSchema.findOne({ role: value }).exec();
    return role;
  }

  async create(dto: RoleDto) {
    try {
      const role = await new this.roleSchema({
        id: uuidv4(),
        ...dto,
      }).save();

      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, dto: RoleDto) {
    try {
      const role = await this.roleSchema
        .findOneAndUpdate(
          {
            id,
          },
          { ...dto },
        )
        .exec();

      return role;
    } catch (error) {
      console.log(error);
    }
  }
}
