import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
