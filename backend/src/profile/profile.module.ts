import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { Preference } from '../preference/entities/preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainer, Trainee, Preference])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
