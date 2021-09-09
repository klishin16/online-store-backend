import { PartialType } from '@nestjs/swagger';
import { CreatePurshaseDto } from './create-purshase.dto';

export class UpdatePurshaseDto extends PartialType(CreatePurshaseDto) {}
