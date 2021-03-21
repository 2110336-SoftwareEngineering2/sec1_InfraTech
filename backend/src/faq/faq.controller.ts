import {
  Controller,
  Req,
  Get,
  UseGuards,
  Patch,
  Body,
  ForbiddenException,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { FAQService } from './faq.service';
import { LetXRequest } from 'src/middlewares/auth.middleware';
import { FAQ } from './entities/faq.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserType } from 'src/register/enums/user-type.enum';

@Controller('faq')
export class FAQController {
  constructor(private faqService: FAQService) {}

  @Get()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async listCourses(@Req() request: LetXRequest): Promise<FAQ[]> {
    return await this.faqService.listFAQs(request.user.id);
  }
}
