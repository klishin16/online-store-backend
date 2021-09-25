import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Basket} from "./basket.model";
import {Device} from "../../devices/models/device.model";

interface BasketDeviceCreationAttrs {
    basketId: number;
    deviceId: number;
}


@Table({tableName: 'basket_device'})
export class BasketDevice extends Model<BasketDevice, BasketDeviceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Basket)
    @Column
    basketId: number;

    @ForeignKey(() => Device)
    @Column
    deviceId: number;

    @Column({type: DataType.INTEGER})
    amount: number = 1;
}