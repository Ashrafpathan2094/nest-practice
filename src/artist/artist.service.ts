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

  async findAll() {
    try {
      const allArtists = await this.ArtistModel.aggregate([
        {
          $lookup: {
            from: 'songs', // The collection name in MongoDB (usually the plural of the model name)
            localField: 'songs', // The field in the artist document
            foreignField: '_id', // The field in the song document
            as: 'songsList', // The name of the new array field with song details
          },
        },
        {
          $project: {
            name: 1,
            genre: 1,
            songsList: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]).exec();
      if (!allArtists) {
        throw new BadRequestException(
          'An error occurred while finding all artists: ',
        );
      }
      return allArtists;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(
        'An error occurred while finding all artists: ',
      );
    }
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
