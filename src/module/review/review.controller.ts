import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.getByProduct(productId);
  }

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @Get('avg/:productId')
  async avg(@Param('productId') productId: string) {
    return this.reviewService.avg(productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('leave/:productId')
  async create(
    @CurrentUser('id') userId,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.create(userId, productId, dto);
  }
}
