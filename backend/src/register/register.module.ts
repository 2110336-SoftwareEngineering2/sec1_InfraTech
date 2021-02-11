import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../entities/user-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
