import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Device, UserFavoriteDevices} from "./models/device.model";
import {UsersModule} from "../users/users.module";
import {User} from "../users/models/users.model";


@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    SequelizeModule.forFeature([Device, User, UserFavoriteDevices]),
    UsersModule
  ]
})
export class DevicesModule {}
