import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Connection, EntityTarget } from 'typeorm';
import { FAQ } from './entities/faq.entity';
import { FAQDto } from './dtos/faq.dto';

@Injectable()
export class FAQService {
  constructor(
    @InjectRepository(FAQ)
    private faqRepository: Repository<FAQ>,
    private connection: Connection,
  ) {}

  async listFAQs(userId: string): Promise<FAQ[]> {
    const faqs = await this.faqRepository.find({
      where: {
        trainerUserId: userId,
      },
      relations: ['trainer'],
    });
    return faqs;
  }

  async getFAQ(id: string): Promise<FAQ> {
    const faq = await this.faqRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['trainer'],
    });

    return faq;
  }
}
