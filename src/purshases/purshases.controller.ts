import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurshasesService } from './purshases.service';
import { CreatePurshaseDto } from './dto/create-purshase.dto';
import { UpdatePurshaseDto } from './dto/update-purshase.dto';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Товар в корзине')
@Controller('purshases')
export class PurshasesController {
  constructor(private readonly purshasesService: PurshasesService) {}

  @Post()
  create(@Body() createPurshaseDto: CreatePurshaseDto) {
    return this.purshasesService.create(createPurshaseDto);
  }

  @Get()
  findAll() {
    return this.purshasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purshasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurshaseDto: UpdatePurshaseDto) {
    return this.purshasesService.update(+id, updatePurshaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purshasesService.remove(+id);
  }
}
