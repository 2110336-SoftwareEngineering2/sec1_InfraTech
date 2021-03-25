import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../decorators/role.decorator';
import { UserType } from '../register/enums/user-type.enum';
import { LetXRequest } from '../middlewares/auth.middleware';
import { CreateReviewDto } from './dtos/create-review-dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Role(UserType.Trainee)
  async createReview(
    @Req() request: LetXRequest,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const traineeUserId = request.user.id;
    return this.reviewService.createReview(traineeUserId, createReviewDto);
  }

  @Get(':trainerUserId')
  async getReviewsByTrainerId(
    @Param('trainerUserId') trainerUserId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.reviewService.getReviewsByTrainerId(trainerUserId, page, limit);
  }
}
