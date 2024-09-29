import { Test, TestingModule } from '@nestjs/testing';
import { RealisationsController } from './realisation.controller';

describe('RealisationsController', () => {
  let controller: RealisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealisationsController],
    }).compile();

    controller = module.get<RealisationsController>(RealisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
