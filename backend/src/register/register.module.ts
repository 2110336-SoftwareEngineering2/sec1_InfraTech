import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TrainerRepository } from './repositories/trainer.repository';
import { TraineeRepository } from './repositories/trainee.repository';
import { Preference } from '../preference/entities/preference.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      TrainerRepository,
      TraineeRepository,
      Preference,
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
