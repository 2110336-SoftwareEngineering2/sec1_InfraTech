import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private preferenceRepository: Repository<Preference>,
  ) {}
  async getAllPreferences(): Promise<Preference[]> {
    return this.preferenceRepository.find();
  }
}
