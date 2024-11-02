import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Credentials {
  @Prop({ required: true })
  email: string;

  @Prop()
  hashedPassword?: string;

  @Prop()
  accessToken?: string;
}

export const CredentialsSchema: MongooseSchema<Credentials> =
  SchemaFactory.createForClass(Credentials);
