import { Controller, Get } from '@nestjs/common';
import { Preference } from './entities/preference.entity';
import { PreferenceService } from './preference.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Preference')
@Controller('preference')
export class PreferenceController {
  constructor(private preferenceService: PreferenceService) {}

  @Get()
  async getAllPreferences(): Promise<Preference[]> {
    return this.preferenceService.getAllPreferences();
  }
}
