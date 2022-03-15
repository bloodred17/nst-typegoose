import { Module } from '@nestjs/common';
import { NstTypegooseModule } from '@nst-typegoose/nst-typegoose';
import { CatController } from './cat.controller';
import { CatSchema } from './cat.schema';

@Module({
  imports: [
    NstTypegooseModule.forFeature([
      {
        typegooseClass: CatSchema,
        schemaOptions: {
          collection: 'cats',
          autoIndex: true,
        },
      },
    ]),
  ],
  controllers: [CatController],
})
export class CatModule {}
