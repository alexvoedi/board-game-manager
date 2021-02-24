import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { Game, GameDocument } from './game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<GameDocument>,
  ) {}

  async create(dto: CreateGameDto) {
    try {
      const game = new this.gameModel(dto);

      await game.save();

      return game;
    } catch (error) {
      return error;
    }
  }
}
