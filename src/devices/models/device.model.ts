import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Brand} from "../../brands/models/brand.model";
import {Category} from "../../categories/models/category.model";
import {User} from "../../users/models/users.model";
import {Basket} from "../../baskets/models/basket.model";
import {BasketDevice} from "../../baskets/models/basket_device.model";


interface DeviceCreationAttrs {
    name: string;
    price: number;
    categoryId: number;
    brandId: number;
    availability: number;
    image: any;
}

@Table({tableName: 'devices'})
export class Device extends Model<Device, DeviceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true})
    name: string;

    @Column({type: DataType.INTEGER})
    price: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    sale: number;

    @Column({type: DataType.INTEGER})
    availability: number;

    @Column({type: DataType.STRING})
    image: string;



    @BelongsToMany(() => Device, () => UserFavoriteDevices)
    deviceFavorites: Device[];


    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @BelongsToMany(() => Category, () => DeviceCategory)
    categories: Category[];

    @BelongsToMany(() => Basket, () => BasketDevice)
    baskets: Basket[];
}


@Table({tableName: 'device_category'})
export class DeviceCategory extends Model {
    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER})
    deviceId: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    categoryId: number;
}


@Table({tableName: "user_favorite"})
export class UserFavoriteDevices extends Model {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Device)
    @Column
    deviceId: number;
}
