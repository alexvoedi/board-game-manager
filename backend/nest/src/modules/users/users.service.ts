import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

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
}
