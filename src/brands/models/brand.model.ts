import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Device} from "../../devices/models/device.model";


interface BrandCreationAttrs {
    name: string;
    description: string;
}

@Table({tableName: 'brands'})
export class Brand extends Model<Brand, BrandCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    // @BelongsToMany(() => Device, () => DeviceBrand)
    // devices: Device[];

    @HasMany(() => Device)
    devices: Device[];
}

// @Table({tableName: "devices-brands"})
// export class DeviceBrand extends Model {
//     @ForeignKey(() => Device)
//     @Column
//     deviceId: number;
//
//     @ForeignKey(() => Brand)
//     @Column
//     brandId: number;
//
// }
