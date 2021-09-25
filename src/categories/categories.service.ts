import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Category} from "./models/category.model";
import {Op, UniqueConstraintError} from "sequelize";

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category) {
    }

    // This action adds a new category
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            return this.categoryRepository.create(createCategoryDto);
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                throw new HttpException("Данная категория уже существует!", HttpStatus.BAD_REQUEST)
            } else {
                throw new HttpException(e.name, HttpStatus.BAD_REQUEST)
            }
        }
    }

    // This action returns all categories
    async findAll() {
        return await this.categoryRepository.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
    }

    // This action returns a #${id} category
    async findOne(categoryId: number) {
        return await this.categoryRepository.findByPk(categoryId);
    }

    // This action returns a #${id} category with inner categories
    async findOneWithInnerCategories(categoryId: number) {
        return await this.categoryRepository.findOne({
            where: {id: categoryId},
            include: {all: true},
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
    }

    // This action updates a #${id} category
    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryRepository.update(updateCategoryDto, {where: {id: id}})
    }

    //This action removes a #${id} category
    async remove(categoryId: number) {
        return await this.categoryRepository.destroy({where: {id: categoryId}});
    }
}
