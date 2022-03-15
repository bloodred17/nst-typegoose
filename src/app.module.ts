import { Module } from '@nestjs/common';
import { NstTypegooseModule } from '@nst-typegoose/nst-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [
    NstTypegooseModule.forRoot('mongodb://localhost:27017/nest'),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
