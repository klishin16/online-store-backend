import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDeviceDto {
    @IsString()
    readonly name: string;

    // @IsNumber()
    readonly price: number;

    // @IsNumber()
    readonly categoryId: number;

    // @IsNumber()
    readonly brandId: number;

    // @IsNumber()
    readonly availability: number;
}
