import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Basket} from "./models/basket.model";
import {Device} from "../devices/models/device.model";
import {AddDeviceDto} from "./dto/add-device.dto";
import {UsersService} from "../users/users.service";
import {DevicesService} from "../devices/devices.service";

@Injectable()
export class BasketsService {
  constructor(
      @InjectModel(Basket) private basketRepository: typeof Basket,
      private deviceService: DevicesService
  ) {}

  // This action adds a new basket
  async create(createBasketDto: CreateBasketDto) {
    return await this.basketRepository.create(createBasketDto);
  }

  // This action returns all baskets
  findAll() {
    return this.basketRepository.findAll();
  }

  // This action returns a #${id} basket
  async findOne(basketId: number) {
    return await this.basketRepository.findOne({where: {id: basketId}});
  }

  // This action returns a #${id} basket with devices
  async findOneWithDevices(basketId: number) {
    return await this.basketRepository.findOne({
      where: {id: basketId},
      include: [
        {model: Device}
      ]
    });
  }

  // This action removes a #${id} basket
  async remove(basketId: number) {
    return await this.basketRepository.destroy({where: {id: basketId}});
  }

  async addDevice(addDeviceDto: AddDeviceDto) {
    const device = await this.deviceService.findById(addDeviceDto.deviceId)
    const basket = await this.basketRepository.findByPk(addDeviceDto.basketId, {include: {model: Device}})
    if (!device || !basket) {
      throw new HttpException('Товар или корзина не найдены!', HttpStatus.NOT_FOUND)
    }
    try {
      await basket.$add('device', device.id)
      // return updatedBasket
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }
    return await this.basketRepository.findByPk(addDeviceDto.basketId, {include: {model: Device}}).then((b) => b.devices)
  }

  async removeDevice(addDeviceDto: AddDeviceDto) {
    const device = await this.deviceService.findById(addDeviceDto.deviceId)
    const basket = await this.basketRepository.findByPk(addDeviceDto.basketId)
    if (!device || !basket) {
      throw new HttpException('Товар или корзина не найдены!', HttpStatus.NOT_FOUND)
    }
    try {
      await basket.$remove('device', device.id)
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }

    return await this.basketRepository.findByPk(addDeviceDto.basketId, {include: {model: Device}}).then((b) => b.devices)
  }
}
