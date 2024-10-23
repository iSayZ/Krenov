// Schema for Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminProfileDocument = AdminProfile & Document;

@Schema({ collection: 'admin_profiles' })
export class AdminProfile {
  @Prop({ type: String, required: true, unique: true })
  admin_id: string;

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  avatar: string;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: String, required: true })
  biography: string;

  @Prop({ type: Date, required: true, default: Date.now })
  updated_at: Date;
}

export const AdminProfileSchema = SchemaFactory.createForClass(AdminProfile);

// Middleware to update `updatedAt` each time the document is modified
AdminProfileSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: new Date() });
  next();
});
