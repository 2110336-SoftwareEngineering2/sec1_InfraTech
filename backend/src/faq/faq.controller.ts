import {
  Controller,
  Req,
  Get,
  UseGuards,
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
import { FAQDto } from './dtos/faq.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('FAQ')
@ApiBearerAuth()
@Controller('faq')
export class FAQController {
  constructor(private faqService: FAQService) {}

  @Get()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async listFAQs(@Req() request: LetXRequest): Promise<FAQ[]> {
    return await this.faqService.listFAQs(request.user.id);
  }

  @ApiParam({ name: 'user_id', type: String, required: true })
  @Get('/trainer/:user_id')
  async getFAQByTrainer(
    @Param('user_id') user_id,
    @Req() request: LetXRequest,
  ): Promise<FAQ[]> {
    return await this.faqService.listFAQs(user_id);
  }

  @ApiParam({ name: 'id', type: String, required: true })
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

  @Post()
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async createFAQ(
    @Body() faqDto: FAQDto,
    @Req() request: LetXRequest,
  ): Promise<FAQ> {
    return await this.faqService.createFAQ(request.user.id, faqDto);
  }

  @ApiParam({ name: 'id', type: String, required: true })
  @Put(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async updateFAQ(
    @Param('id') id,
    @Body() faqDto: FAQDto,
    @Req() request: LetXRequest,
  ): Promise<FAQ> {
    return await this.faqService.updateFAQ(id, faqDto);
  }

  @ApiParam({ name: 'id', type: String, required: true })
  @Delete(':id')
  @Role(UserType.Trainer)
  @UseGuards(RoleGuard)
  async deleteFAQ(@Param('id') id, @Req() request: LetXRequest): Promise<void> {
    let faq = await this.faqService.getFAQ(id);

    if (faq.trainerUserId != request.user.id) {
      throw new ForbiddenException();
    }

    await this.faqService.deleteFAQ(id);
  }
}
