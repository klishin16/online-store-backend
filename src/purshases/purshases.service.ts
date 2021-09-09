import { Injectable } from '@nestjs/common';
import { CreatePurshaseDto } from './dto/create-purshase.dto';
import { UpdatePurshaseDto } from './dto/update-purshase.dto';

@Injectable()
export class PurshasesService {
  create(createPurshaseDto: CreatePurshaseDto) {
    return 'This action adds a new purshase';
  }

  findAll() {
    return `This action returns all purshases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purshase`;
  }

  update(id: number, updatePurshaseDto: UpdatePurshaseDto) {
    return `This action updates a #${id} purshase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purshase`;
  }
}
