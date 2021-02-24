import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Collection, CollectionDocument } from './collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<CollectionDocument>,

    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, dto: CreateCollectionDto) {
    try {
      const collection = new this.collectionModel(dto);

      this.usersService.addCollection(userId, collection);

      await collection.save();

      return collection;
    } catch (error) {
      return error;
    }
  }
}
