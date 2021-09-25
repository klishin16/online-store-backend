import {Dependencies, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Device, DeviceCategory} from "./models/device.model";
import {UsersService} from "../users/users.service";
import {Brand} from "../brands/models/brand.model";
import {Category} from "../categories/models/category.model";
import {AddCategoryDto} from "./dto/add-category.dto";
import {CategoriesService} from "../categories/categories.service";
import {FilesService} from "../files/files.service";
import {Op} from "sequelize";


// @Dependencies(UsersService)
@Injectable()
export class DevicesService {
  constructor(
      @InjectModel(Device) private deviceRepository: typeof Device,
      private userService: UsersService,
      private categoryService: CategoriesService,
      private fileService: FilesService
  ) {}

  // This action adds a new device
  async create(createDeviceDto: CreateDeviceDto, image: any) {
    try {
      const fileName = await this.fileService.createFile(image);
      const device = await this.deviceRepository.create({...createDeviceDto, image: fileName})
      return device;
    } catch (e) {
      //TODO обработка всех ошибок
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }
  }

  //This action returns all devices
  async findAll(searchQuery?: string, categoryId?: number, minPrice?: number, maxPrice?: number) {
    const categoryFilter = categoryId ? {id: categoryId} : undefined
    console.log("CatF:", categoryFilter)

    // const category = await this.categoryService.findOne(categoryId)

    return await this.deviceRepository.findAll({
      where: {
        name: {
          [Op.substring]: searchQuery ? searchQuery : '',
        },
        price: {
          [Op.between]: [minPrice ? minPrice: 0, maxPrice ? maxPrice: Number.MAX_VALUE] //TODO
        }
      },
      include: [
        {
          model: Category,
          where: categoryFilter
        },
        {
          model: Brand
        }
      ],
      attributes: {exclude: ['createdAt', 'updatedAt']},
    });
  }

  //This action returns a #${id} device
  async findOne(deviceId: number) {
    return await this.deviceRepository.findOne({
      where: {id: deviceId},
      include: [
        {model: Brand},
        {model: Category}
      ]
    });
  }

  async findById(deviceId: number) {
    return await this.deviceRepository.findByPk(deviceId)
  }

  //This action updates a #${id} device
  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    if (updateDeviceDto.categoriesId) {
      const device = await this.deviceRepository.findByPk(id)
      await device.$set('categories', updateDeviceDto.categoriesId)
    }
    return await this.deviceRepository.update(updateDeviceDto, {where: {id: id}})
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

  async addCategory(addCategoryDto: AddCategoryDto) {
    const device = await this.deviceRepository.findByPk(addCategoryDto.deviceId);
    const category = await this.categoryService.findOne(addCategoryDto.categoryId);
    if (device && category) {
      await device.$add('category', category.id);
      return addCategoryDto;
    }
    throw new HttpException('Товар или категория не найдены', HttpStatus.NOT_FOUND);
  }
}
