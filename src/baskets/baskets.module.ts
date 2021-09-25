import { Module } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "./models/basket.model";
import {User} from "../users/models/users.model";
import {UsersModule} from "../users/users.module";
import {BasketDevice} from "./models/basket_device.model";
import {DevicesModule} from "../devices/devices.module";

@Module({
  controllers: [BasketsController],
  providers: [BasketsService],
  imports: [
      SequelizeModule.forFeature([Basket, BasketDevice]),
      DevicesModule
  ]
})
export class BasketsModule {}
