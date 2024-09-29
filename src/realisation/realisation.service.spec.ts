import { Test, TestingModule } from '@nestjs/testing';
import { RealisationsService } from './realisation.service';

describe('RealisationsService', () => {
  let service: RealisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealisationsService],
    }).compile();

    service = module.get<RealisationsService>(RealisationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
