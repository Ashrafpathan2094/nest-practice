import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SongsDocument = HydratedDocument<Songs>;

@Schema({ timestamps: true })
export class Songs {
  @Prop({ required: true })
  title: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }])
  artist: string[];

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  duration: number;
}

export const SongsSchema = SchemaFactory.createForClass(Songs);
