import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { FAQ } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainer, Trainee, FAQ])],
  controllers: [FAQController],
  providers: [FAQService],
})
export class FAQModule {}
