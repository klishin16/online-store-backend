import {Module} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CategoriesController} from './categories.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./models/category.model";
import {DeviceCategory} from "../devices/models/device.model";

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService],
    imports: [
        SequelizeModule.forFeature([Category, DeviceCategory])
    ],
    exports: [
        CategoriesService
    ]
})
export class CategoriesModule {
}
