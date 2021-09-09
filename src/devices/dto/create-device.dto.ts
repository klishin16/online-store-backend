import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDeviceDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;


    @IsNumber()
    categoryId: number;

    @IsNumber()
    brandId: number;

    @IsNumber()
    availability: number;
}
