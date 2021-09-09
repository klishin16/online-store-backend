import { Module } from '@nestjs/common';
import { PurshasesService } from './purshases.service';
import { PurshasesController } from './purshases.controller';

@Module({
  controllers: [PurshasesController],
  providers: [PurshasesService]
})
export class PurshasesModule {}
