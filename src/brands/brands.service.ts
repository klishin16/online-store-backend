import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Brand} from "./models/brand.model";

@Injectable()
export class BrandsService {


  constructor(@InjectModel(Brand) private brandRepository: typeof Brand) {
  }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.brandRepository.create(createBrandDto)
      return brand;
    } catch (e) {
      throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
    }
  }

  // This action returns all brands
  async findAll() {
    return await this.brandRepository.findAll({
      include: {all: true},
      attributes: {exclude: ['createdAt', 'updatedAt']}
    })
  }

  // This action returns current brand
  async findOne(id: number) {
    return await this.brandRepository.findOne({where: {id: id}})
  }


  // This action updates a #${id} brand
  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return await this.brandRepository.update({...updateBrandDto}, {
      where: {id: updateBrandDto.id},
      returning: true,
    }).then(resp => resp[1]) //only for postgres иначе resp = [x]
  }

  // This action removes a #${id} brand
  async remove(id: number) {
    return await this.brandRepository.destroy({where: {id: id}});
  }
}
