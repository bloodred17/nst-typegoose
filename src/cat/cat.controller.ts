import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nst-typegoose/nst-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CatSchema } from './cat.schema';

@Controller('cat')
export class CatController {
  constructor(
    @InjectModel(CatSchema)
    private readonly catModel: ReturnModelType<typeof CatSchema>,
  ) {}

  @Get()
  check() {
    return {
      message: 'API is working',
    };
  }

  @Post('/')
  async create(@Body() cat: any) {
    const createdCat = new this.catModel(cat);
    return await createdCat.save();
  }
}
