import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Connection, EntityTarget } from 'typeorm';
import { FAQ } from './entities/faq.entity';

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
      relations: ["trainer"],
    });

    return faqs;
  }
}
