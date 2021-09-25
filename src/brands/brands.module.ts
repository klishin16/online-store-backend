import {Module} from '@nestjs/common';
import {BrandsService} from './brands.service';
import {BrandsController} from './brands.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/models/users.model";
import {Brand} from "./models/brand.model";

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [
    SequelizeModule.forFeature([User, Brand])
  ]
})
export class BrandsModule {}
