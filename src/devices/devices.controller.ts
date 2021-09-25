import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DevicesService} from './devices.service';
import {CreateDeviceDto} from './dto/create-device.dto';
import {UpdateDeviceDto} from './dto/update-device.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/models/users.model";
import {Device} from "./models/device.model";
import {AddCategoryDto} from "./dto/add-category.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Request} from "express";
import {INTEGER} from "sequelize";


@ApiTags('Товары')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({summary: 'Создание товара'})
  @ApiResponse({status: 200, type: Device})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createDeviceDto: CreateDeviceDto,
         @UploadedFile() image) {
    return this.devicesService.create(createDeviceDto, image);
  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200})
  // @ApiQuery({name: "q", type: String, description: "A parameter. Optional", required: false})
  @Get()
  findAll(@Req() request: Request) {
    return this.devicesService.findAll(
        request.query['q'] as string,
        Number(request.query['categoryId']),
        Number(request.query['minPrice']),
        Number(request.query['maxPrice'])
        );
  }

  @ApiOperation({summary: 'Получить конкретного пользователя'})
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(id);
  }

  @Get('/favorite/:userId')
  getFavoriteUserDevicesByUserId(@Param('userId') userId: number) {
    return this.devicesService.findFavoriteByUser(userId);
  }

  @ApiOperation({summary: 'Добавление категории к продукту'})
  @Post('add-category')
  async addCategoryToDevice(@Body() addCategoryDto: AddCategoryDto) {
    return this.devicesService.addCategory(addCategoryDto);
  }
}
