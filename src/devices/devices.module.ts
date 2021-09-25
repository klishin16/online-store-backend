import {Module} from '@nestjs/common';
import {DevicesService} from './devices.service';
import {DevicesController} from './devices.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Device, UserFavoriteDevices} from "./models/device.model";
import {UsersModule} from "../users/users.module";
import {User} from "../users/models/users.model";
import {CategoriesModule} from "../categories/categories.module";
import {FilesModule} from "../files/files.module";


@Module({
    controllers: [DevicesController],
    providers: [DevicesService],
    imports: [
        SequelizeModule.forFeature([Device, User, UserFavoriteDevices]),
        UsersModule,
        CategoriesModule,
        FilesModule
    ],
    exports: [
        DevicesService
    ]
})
export class DevicesModule {
}
