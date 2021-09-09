import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {LoginResponseDto} from "./dto/login-response.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Войти в систему"})
    @ApiResponse({status: 200, type: LoginResponseDto})
    @Post('/login')
    login(@Body() userDto: CreateUserDto): Promise<{token: String}> {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
