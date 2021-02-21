import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TrainerProfile } from 'src/entities/trainer-profile.entity';
import { TraineeProfile } from 'src/entities/trainee-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
