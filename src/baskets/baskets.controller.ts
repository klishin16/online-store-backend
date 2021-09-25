import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import {AddDeviceDto} from "./dto/add-device.dto";


@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Post()
  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketsService.create(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.basketsService.findOneWithDevices(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.basketsService.remove(id);
  }

  @Post('/add-device')
  addDevice(@Body() addDeviceDto: AddDeviceDto) {
    return this.basketsService.addDevice(addDeviceDto)
  }

  @Post('/remove-device')
  removeDevice(@Body() addDeviceDto: AddDeviceDto) {
    return this.basketsService.removeDevice(addDeviceDto)
  }
}
