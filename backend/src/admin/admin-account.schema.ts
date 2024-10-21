import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, UpdateQuery } from 'mongoose';

export type AdminAccountDocument = AdminAccount & Document;

interface AdminAccountUpdate extends UpdateQuery<AdminAccount> {
  refresh_token?: string;
}

@Schema({ collection: 'admin_accounts' })
export class AdminAccount {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  refresh_token: string;

  @Prop({ type: Boolean, required: true, default: false })
  two_fa_enabled: boolean;

  @Prop({ type: String, required: true, default: 'null' })
  two_fa_secret: string;

  @Prop({ type: [String], required: true, default: [] })
  two_fa_backup_codes: string[];

  @Prop({ type: String, required: true })
  access_level: string;

  @Prop({ type: Date, required: true })
  last_login: Date;

  @Prop({ type: Date, required: true, default: Date.now })
  updated_at: Date;
}

export const AdminAccountSchema = SchemaFactory.createForClass(AdminAccount);

// Middleware to update `updatedAt` each time the document is modified
AdminAccountSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as AdminAccountUpdate;

  if (update && (update.refresh_token || update.$set?.refresh_token)) {
    return next();
  }

  this.set({ updated_at: new Date() });
  next();
});
