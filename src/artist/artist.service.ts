import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './artist.schema';
import mongoose, { Model, Types } from 'mongoose';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private ArtistModel: Model<ArtistDocument>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    try {
      const songs = createArtistDto.songs.map(
        (songId) => new mongoose.Types.ObjectId(songId),
      );
      const createdArtist = new this.ArtistModel({ ...createArtistDto, songs });
      return createdArtist.save();
    } catch (error) {
      console.log('error', error);
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'An error occurred while creating the Artist: ' + error.message,
      );
    }
  }

  findAll() {
    return `This action returns all artist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
