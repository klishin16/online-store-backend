import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Device, DeviceCategory} from "../../devices/models/device.model";


interface CategoryCreationAttrs {
    name: string;
}

@Table({tableName: "categories"})
export class Category extends Model<Category, CategoryCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;


    @ForeignKey(() => Category)
    @Column
    categoryId: number;

    @HasMany(() => Category)
    innerCategories: Category[];

    @BelongsToMany(() => Device, () => DeviceCategory)
    devices: Device[];
}
