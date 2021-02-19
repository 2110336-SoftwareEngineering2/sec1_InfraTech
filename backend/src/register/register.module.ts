import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TrainerRepository } from './repositories/trainer.repository';
import { TraineeProfileRepository } from './repositories/trainee-profile.repository';
import { Preference } from './entities/preference.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      TrainerRepository,
      TraineeProfileRepository,
      Preference,
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
