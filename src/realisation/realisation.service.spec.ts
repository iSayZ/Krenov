import { Test, TestingModule } from '@nestjs/testing';
import { RealisationService } from './realisation.service';

describe('RealisationService', () => {
  let service: RealisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealisationService],
    }).compile();

    service = module.get<RealisationService>(RealisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
