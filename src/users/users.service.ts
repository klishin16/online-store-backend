import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./models/users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import * as bcrypt from 'bcrypt';
import {UniqueConstraintError} from "sequelize";
import {Device} from "../devices/models/device.model";

@Injectable()
export class UsersService {
    private saltRounds = 14;

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);  //TODO обработаь возможную ошибку
        const hashedDto: CreateUserDto = {...dto, password: hashedPassword}
        try {
            const user = await this.userRepository.create(hashedDto);
            const role = await this.roleService.getRoleByValue("ADMIN")
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user;
        }
        catch (e) {
            if (e instanceof UniqueConstraintError) {
                throw new HttpException('Пользователь с данным email уже существует', HttpStatus.BAD_REQUEST)
            } else {
                throw new HttpException('Ошибка создания пользователя', HttpStatus.BAD_REQUEST);
            }
        }
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async getUserById(userId: number) {
        return await this.userRepository.findOne({where: {id: userId}})
    }

    async getUserByIdWithFavoriteDevices(userId: number) {
        return await this.userRepository.findOne({
            where: {id: userId},
            include: [
                {model: Device}
            ]})
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
