import { Test, TestingModule } from '@nestjs/testing';
import { RealisationController } from './realisation.controller';

describe('RealisationController', () => {
  let controller: RealisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealisationController],
    }).compile();

    controller = module.get<RealisationController>(RealisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
