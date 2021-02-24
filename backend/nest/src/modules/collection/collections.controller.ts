import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { Self } from 'src/decorators/self.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from '../users/user.schema';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(
    @Inject(CollectionsService)
    private readonly collectionsService: CollectionsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Self('id') userId: string, @Body() dto: CreateCollectionDto) {
    return this.collectionsService.create(userId, dto);
  }
}
