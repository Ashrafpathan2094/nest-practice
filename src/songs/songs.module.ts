import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Songs, SongsSchema } from './songs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Songs.name, schema: SongsSchema }]),
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
