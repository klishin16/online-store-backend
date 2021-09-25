import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {User} from "../../users/models/users.model";
import {Device} from "../../devices/models/device.model";
import {BasketDevice} from "./basket_device.model";


interface BasketCreationAttrs {
    userId: number;
}

@Table({tableName: 'baskets'})
export class Basket extends Model<Basket, BasketCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Device, () => BasketDevice)
    devices: Device[];
}
