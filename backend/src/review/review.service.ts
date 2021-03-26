import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import {
  Application,
  ApplicationStatus,
} from '../application/entities/application.entity';
import { CreateReviewDto } from './dtos/create-review-dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async createReview(
    traineeUserId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const { applicationId, comment, rating } = createReviewDto;

    const application = await this.applicationRepository.findOne(
      applicationId,
      { relations: ['trainee', 'course', 'course.trainer'] },
    );

    if (!application) {
      throw new NotFoundException('The application was not found');
    }
    if (traineeUserId !== application.traineeUserId) {
      throw new BadRequestException(
        `The trainee doesn't match with one in the application`,
      );
    }
    if (application.status !== ApplicationStatus.COMPLETE) {
      throw new ForbiddenException(`The application's status was not complete`);
    }

    const review = this.reviewRepository.create();

    review.trainer = application.course.trainer;
    review.trainee = application.trainee;
    review.application = application;
    review.rating = rating;
    review.comment = comment;

    try {
      // TODO: Add serialization for response
      return await this.reviewRepository.save(review);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('The review of application already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getReviewsByTrainerId(
    trainerUserId: string,
    page: number,
    limit: number,
  ): Promise<Review[]> {
    // TODO: Add serialization for response
    return this.reviewRepository.find({
      where: {
        trainer: {
          userId: trainerUserId,
        },
      },
      relations: ['trainer', 'trainee', 'application'],
      skip: page * limit,
      take: limit,
    });
  }
}
