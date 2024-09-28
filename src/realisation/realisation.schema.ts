import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RealisationDocument = Realisation & Document;

@Schema()
export class Realisation {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop()
  date: Date;
}

export const RealisationSchema = SchemaFactory.createForClass(Realisation);
