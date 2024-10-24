import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, UpdateQuery } from 'mongoose';
import { SessionSchema, SessionSchemaFactory } from './session.schema';

// Interface of session object into sessions[]
export interface Session {
  id: string;
  ip: string;
  user_agent: string;
  refresh_token: string;
  created_at: Date;
}

export type AdminAccountDocument = AdminAccount & Document;

@Schema({ collection: 'admin_accounts' })
export class AdminAccount {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

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

  @Prop({ type: [SessionSchemaFactory], default: [] }) // Ajout du tableau de sessions
  sessions: SessionSchema[];
}

export const AdminAccountSchema = SchemaFactory.createForClass(AdminAccount);

// Middleware to update `updated_at` each time the document is modified
AdminAccountSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as UpdateQuery<AdminAccount>;

  if (
    update &&
    (update.sessions || update.$set?.sessions || update.$pull?.sessions)
  ) {
    return next();
  }

  this.set({ updated_at: new Date() });
  next();
});
