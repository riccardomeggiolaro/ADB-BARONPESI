import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<MongoUser>;

@Schema({ collection: 'users', timestamps: true })
export class MongoUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  picture?: string;
}

export class User extends MongoUser {
  id: string;
  fullName: string;
}

export const UserSchema: MongooseSchema<User> =
  SchemaFactory.createForClass(User);
