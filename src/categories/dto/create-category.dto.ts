import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({type: String})
    @IsString()
    name: string;

    categoryId: number | null;
}
