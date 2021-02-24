import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('games')
export class GamesController {
  constructor(
    @Inject(GamesService)
    private readonly gamesService: GamesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }
}
