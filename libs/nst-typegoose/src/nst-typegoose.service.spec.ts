import { Test, TestingModule } from '@nestjs/testing';
import { NstTypegooseService } from './nst-typegoose.service';

describe('NstTypegooseService', () => {
  let service: NstTypegooseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NstTypegooseService],
    }).compile();

    service = module.get<NstTypegooseService>(NstTypegooseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
