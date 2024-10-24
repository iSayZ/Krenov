import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Interface pour le document de session
export interface Session {
  session_id: string;
  ip: string; // IP de l’utilisateur
  user_agent: string; // Navigateur
  refresh_token: string; // Token de rafraîchissement
  created_at: Date; // Date de création de la session
}

@Schema()
export class SessionSchema implements Session {
  @Prop({ required: true })
  session_id: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  user_agent: string;

  @Prop({ required: true })
  refresh_token: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const SessionSchemaFactory = SchemaFactory.createForClass(SessionSchema);
