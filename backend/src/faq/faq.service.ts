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

  async createFAQ(trainerUserId: string, dto: FAQDto): Promise<FAQ> {
    let faq = await this.faqRepository.create({
      question: dto.question,
      answer: dto.answer,
      trainerUserId: trainerUserId,
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      faq = await queryRunner.manager.save(FAQ, faq);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This course already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return faq;
  }

  async updateFAQ(id: string, faqDto: FAQDto): Promise<FAQ> {
    await this.faqRepository.update(id, faqDto);
    return await this.getFAQ(id);
  }

  async deleteFAQ(id: string): Promise<void> {
    await this.faqRepository.delete({
      id: id,
    });
  }
}
