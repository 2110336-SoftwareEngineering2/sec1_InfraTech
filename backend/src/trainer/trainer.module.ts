import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '../register/repositories/trainer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRepository])],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
