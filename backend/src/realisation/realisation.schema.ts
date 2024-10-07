// Schema for Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RealisationDocument = Realisation & Document;

@Schema()
export class Realisation {
  @Prop({ type: Number, required: true })
  order: number;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: [String], required: false })
  imageUrls: string[];

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, required: true, default: Date.now })
  updatedAt: Date;
}

export const RealisationSchema = SchemaFactory.createForClass(Realisation);

// Middleware to update `updatedAt` each time the document is modified
RealisationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
