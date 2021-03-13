import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from '../entities/trainee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  providers: [TraineeService],
  exports: [TraineeService],
})
export class TraineeModule {}
