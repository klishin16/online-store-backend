import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/models/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';
import {log} from "util";
import { BasketsController } from './baskets/baskets.controller';
import { BasketsService } from './baskets/baskets.service';
import { BasketsModule } from './baskets/baskets.module';
import { DevicesModule } from './devices/devices.module';
import { PurshasesModule } from './purshases/purshases.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import {Device, DeviceCategory, UserFavoriteDevices} from "./devices/models/device.model";
import {Brand} from "./brands/models/brand.model";
import {Category} from "./categories/models/category.model";

@Module({
    controllers: [BasketsController],
    providers: [BasketsService],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                User,
                Role,
                UserRoles,
                Post,
                Device,
                Brand,
                Category,
                DeviceCategory,
                UserFavoriteDevices
            ],
            autoLoadModels: true,
            logging: sql => console.log("[DB] - ", sql)
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        BasketsModule,
        DevicesModule,
        PurshasesModule,
        BrandsModule,
        CategoriesModule,
    ]
})
export class AppModule {}
