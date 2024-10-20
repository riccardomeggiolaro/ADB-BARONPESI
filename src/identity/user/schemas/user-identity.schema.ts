import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Credentials, CredentialsSchema } from './credentials.schema';
import { MongoUser } from './user.schema';

export type UserIdentityDocument = HydratedDocument<UserIdentity>;

@Schema({
  timestamps: true,
})
export class UserIdentity {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  user: MongoUser;

  @Prop({ required: true, index: true })
  provider: string;

  @Prop({ type: CredentialsSchema, required: true })
  credentials: Credentials;
}

export const UserIdentitySchema: MongooseSchema<UserIdentity> =
  SchemaFactory.createForClass(UserIdentity);

UserIdentitySchema.index(
  { 'credentials.email': 1, provider: 1 },
  { unique: true },
);
UserIdentitySchema.index({ user: 1, provider: 1 }, { unique: true });
