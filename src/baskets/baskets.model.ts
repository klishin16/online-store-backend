import {Column, DataType, Model, Table} from "sequelize-typescript";

interface BasketCreationAttrs {
    userId: number;
}


@Table({tableName: 'baskets'})
export class Basket extends Model<Basket, BasketCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
}