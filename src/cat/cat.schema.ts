import { prop } from '@typegoose/typegoose';

export class CatSchema {
  @prop()
  name: string;

  @prop()
  breed: string;
}
