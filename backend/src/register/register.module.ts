import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { TrainerProfile } from './entities/trainer-profile.entity';
import { TraineeProfile } from './entities/trainee-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth, TrainerProfile, TraineeProfile]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
