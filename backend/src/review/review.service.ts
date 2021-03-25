import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review-dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  async createReview(
    traineeUserId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    console.log(traineeUserId);
    console.log(createReviewDto);
    return Promise.resolve(null);
  }

  async getReviewsByTrainerId(
    trainerUserId: string,
    page: number,
    limit: number,
  ): Promise<Review[]> {
    console.log('trainerUserId', trainerUserId);
    console.log('page', page);
    console.log('limit', limit);
    return Promise.resolve(null);
  }
}
