import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../entities/user-auth.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TrainerProfile } from 'src/entities/trainer-profile.entity';
import { TraineeProfile } from 'src/entities/trainee-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth, TrainerProfile, TraineeProfile])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
