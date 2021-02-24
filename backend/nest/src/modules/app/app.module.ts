import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CollectionsModule } from '../collection/collections.module';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://root:test@localhost:27017/nest?authSource=admin',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
      },
    ),
    GamesModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
