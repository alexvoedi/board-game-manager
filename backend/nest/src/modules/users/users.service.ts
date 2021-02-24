import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Collection, Model } from 'mongoose';
import { CollectionDocument } from '../collection/collection.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const user = new this.userModel(dto);

      await user.save();

      const { password, ...result } = user.toObject();

      return result;
    } catch (error) {
      return error;
    }
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);
    return user.toObject();
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user.toObject();
  }

  async findOneByUsernameWithPassword(username: string) {
    const user = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();

    return user.toObject();
  }

  async addCollection(userId: string, collection: CollectionDocument) {
    const user = await this.userModel.findById(userId);

    user.collections.push(collection);

    return await user.save();
  }
}
