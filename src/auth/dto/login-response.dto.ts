import {ApiProperty} from "@nestjs/swagger";

export class LoginResponseDto {

    @ApiProperty({example: 'gsgsdgsgdsgsdgsdfgfgcvurhdv67rujggsg', description: 'token'})
    readonly token: String;
}