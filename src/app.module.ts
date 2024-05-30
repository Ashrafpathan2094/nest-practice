import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistModule } from './artist/artist.module';

const db = 'mongodb+srv://Stark:Stark2094@cluster0.95ghcza.mongodb.net/';
@Module({
  imports: [SongsModule, MongooseModule.forRoot(db), ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
