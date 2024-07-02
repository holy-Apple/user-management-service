import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Block extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  blocker: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  blocked: Types.ObjectId;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
