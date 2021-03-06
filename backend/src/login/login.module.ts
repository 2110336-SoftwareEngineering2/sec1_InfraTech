import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainer, Trainee])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
