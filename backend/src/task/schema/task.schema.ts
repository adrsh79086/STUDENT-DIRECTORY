import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {

  @Prop({required:true, unique:true})
  task_uuid : string;
  
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  priority: string;

  @Prop({
    required: true
  })
  userId:string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);