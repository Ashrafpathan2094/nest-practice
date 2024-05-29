import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongsDocument = HydratedDocument<Songs>;

@Schema({ timestamps: true })
export class Songs {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  artist: string[];

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  duration: number;
}

export const SongsSchema = SchemaFactory.createForClass(Songs);
