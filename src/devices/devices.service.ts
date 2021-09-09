import {Dependencies, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Device} from "./models/device.model";
import {UsersService} from "../users/users.service";


// @Dependencies(UsersService)
@Injectable()
export class DevicesService {
  constructor(
      @InjectModel(Device) private deviceRepository: typeof Device,
      private userService: UsersService,
  ) {}

  // This action adds a new device
  async create(createDeviceDto: CreateDeviceDto) {
    try {
      const device = await this.deviceRepository.create(createDeviceDto)
      return device;
    } catch (e) {
      //TODO обработка всех ошибок
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }
  }

  //This action returns all devices
  async findAll() {
    return await this.deviceRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }

  //This action return favorite user (userId) devices
  async findFavoriteByUser(userId: number) {
    const user = await this.userService.getUserByIdWithFavoriteDevices(userId)
    try {
      if (!user) {
        return new HttpException("User is not found", HttpStatus.BAD_REQUEST)
      }
      return user.favoriteDevices;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }
  }
}
