import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import {IsNumber, IsString} from "class-validator";

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
