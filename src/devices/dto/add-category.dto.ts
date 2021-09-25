import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddCategoryDto {
    @ApiProperty({example: '1', description: 'Id товара'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly deviceId: number;


    @ApiProperty({example: '4', description: 'Id категории'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly categoryId: number;
}
