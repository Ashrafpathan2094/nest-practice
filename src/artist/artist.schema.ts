import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  genre: string;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Songs', required: true },
  ])
  songs: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
