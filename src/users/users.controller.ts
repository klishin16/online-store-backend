import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./models/users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UserRole} from "../roles/entities/userRole.enum";
import {GetUserDto} from "./dto/get-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // @Roles(UserRole.Admin)
    // @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получить кокретного пользователя'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({summary: 'Получить кокретного пользователя по email'})
    @ApiResponse({status: 200, type: User})
    @Post('byEmail')
    getUserByEmail(@Body() getUserDto: GetUserDto) {
        return this.usersService.getUserByEmail(getUserDto.email);
    }

    @ApiOperation({summary: 'Удалить поьзователя'})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiQuery({ name: 'role', enum: UserRole })
    @ApiResponse({status: 200})
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard)
    @Post('/add-role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Убрать роль роль'})
    @ApiQuery({ name: 'role', enum: UserRole })
    @ApiResponse({status: 200})
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard)
    @Post('/remove-role')
    removeRole(@Body() dto: AddRoleDto) {
        return this.usersService.removeRole(dto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles(UserRole.Admin)
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
