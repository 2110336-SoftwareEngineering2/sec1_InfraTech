import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { TrainerProfileRepository } from './repositories/trainer-profile.repository';
import { TraineeProfileRepository } from './repositories/trainee-profile.repository';
import { Preference } from './entities/preference.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAuthRepository,
      TrainerProfileRepository,
      TraineeProfileRepository,
      Preference,
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
