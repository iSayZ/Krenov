// Schema for Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminAccountDocument = AdminAccount & Document;

@Schema({ collection: 'admin_accounts' })
export class AdminAccount {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  google_auth_secret: string;

  @Prop({ type: String, required: true })
  access_level: string;

  @Prop({ type: Date, required: true })
  last_login: Date;

  @Prop({ type: Date, required: true, default: Date.now })
  updated_at: Date;
}

export const AdminAccountSchema = SchemaFactory.createForClass(AdminAccount);

// Middleware to update `updatedAt` each time the document is modified
AdminAccountSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});
