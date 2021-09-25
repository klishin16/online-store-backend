import {Body, Controller, Logger, Post} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {LoginResponseDto} from "./dto/login-response.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    logger: Logger;

    constructor(private authService: AuthService) {
        this.logger = new Logger(AuthController.name)
    }

    @ApiOperation({summary: "Войти в систему"})
    // @ApiResponse({status: 200, type: LoginResponseDto})
    @Post('/login')
    login(@Body() userDto: CreateUserDto): Promise<{token: String}> {
        this.logger.debug("/login")
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: "Регистрация в системе"})
    @ApiResponse({status: 200, type: CreateUserDto})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
