import { Module } from '@nestjs/common';
import { TraineeModule } from '../trainee/trainee.module';
import { ApplicationController } from './application.controller';

@Module({
  imports: [TraineeModule],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
