// Schema for Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RealisationDocument = Realisation & Document;

@Schema()
export class Realisation {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: [String], required: false })
  imageUrls: string[];

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;
}

export const RealisationSchema = SchemaFactory.createForClass(Realisation);
