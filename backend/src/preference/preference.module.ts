import { Module } from '@nestjs/common';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preference])],
  controllers: [PreferenceController],
  providers: [PreferenceService],
})
export class PreferenceModule {}
