import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreatePostDto {

    @ApiProperty({example: 'Заголовок поста'})
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;

    @ApiProperty({example: 'loreum ipsum', description: 'Тело поста'})
    @IsString({message: 'Должно быть строкой'})
    readonly content: string;

    readonly userId: number;
}
