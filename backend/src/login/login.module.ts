import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './user-auth.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
