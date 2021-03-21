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
  async listFAQs(@Req() request: LetXRequest): Promise<FAQ[]> {
    return await this.faqService.listFAQs(request.user.id);
  }

  @Get('/trainer/:user_id')
  async getFAQByTrainer(
    @Param('user_id') user_id,
    @Req() request: LetXRequest,
  ): Promise<FAQ[]> {
    return await this.faqService.listFAQs(user_id);
  }

  @Get(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async getFAQ(@Param('id') id, @Req() request: LetXRequest): Promise<FAQ> {
    let faq: FAQ = await this.faqService.getFAQ(id);

    if (faq.trainerUserId != request.user.id) {
      throw new ForbiddenException();
    }

    return faq;
  }
}
