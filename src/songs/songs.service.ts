import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Songs, SongsDocument } from './songs.schema';
import { Model } from 'mongoose';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Songs.name) private songsModel: Model<SongsDocument>,
  ) {}
  async create(createSongDto: CreateSongDto) {
    try {
      const createdSong = new this.songsModel(createSongDto);
      return await createdSong.save();
    } catch (error) {
      console.log('error', error);
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'An error occurred while creating the song: ' + error.message,
      );
    }
  }

  async findAll(query) {
    try {
      const { page = 1, limit = 10 } = query;
      const skip = (page - 1) * limit;
      return await this.songsModel.find().skip(skip).limit(limit).exec();
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while fetching the songs: ' + error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const record = await this.songsModel.findById(id).exec();
      if (!record) {
        throw new BadRequestException('Song not found ');
      }
      return record;
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while fetching the songs: ' + error.message,
      );
    }
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    try {
      const result = await this.songsModel
        .updateOne({ _id: id }, { $set: updateSongDto })
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException(`Song with id ${id} not found`);
      }
      return this.songsModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(
        `Error updating song with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedSong = await this.songsModel.findByIdAndDelete(id).exec();

      if (!deletedSong) {
        throw new NotFoundException(`Song with id ${id} not found`);
      }

      return deletedSong;
    } catch (error) {
      throw new NotFoundException(
        `Error deleting song with id ${id}: ${error.message}`,
      );
    }
  }
}
