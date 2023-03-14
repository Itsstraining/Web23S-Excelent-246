import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  roomId: string;

  @Prop()
  msg: string;

  @Prop()
  date: string;

  @Prop()
  from: string;

  @Prop()
  fromURL: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
