import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSchema } from './schema/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
