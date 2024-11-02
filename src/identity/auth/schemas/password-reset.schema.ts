// password-reset.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class PasswordReset {
  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, default: false })
  used: boolean;

  @Prop({ required: true })
  expiresAt: Date;
}

export const PasswordResetSchema: MongooseSchema<PasswordReset> =
  SchemaFactory.createForClass(PasswordReset);

PasswordResetSchema.index({ email: 1, used: 1 });
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
