import { Test, TestingModule } from '@nestjs/testing';
import { RealisationsController } from './realisation.controller';
import { RealisationsService } from './realisation.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';

// Create a mock service
const mockRealisationsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  updateRealisation: jest.fn(),
  deleteRealisation: jest.fn(),
};

describe('RealisationsController', () => {
  let controller: RealisationsController;
  let service: RealisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealisationsController],
      providers: [
        {
          provide: RealisationsService,
          useValue: mockRealisationsService,
        },
      ],
    }).compile();

    controller = module.get<RealisationsController>(RealisationsController);
    service = module.get<RealisationsService>(RealisationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test create method
  describe('create', () => {
    it('should call the service create method', async () => {
      const dto: CreateRealisationDto = {
        title: 'Test Title',
        content: 'Test Content',
        imageUrls: [],
      };
      mockRealisationsService.create.mockResolvedValue('new realisation');
      
      const result = await controller.create([], dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual('new realisation');
    });
  });

  // Test findAll method
  describe('findAll', () => {
    it('should return an array of realisations', async () => {
      const realisations = [{ title: 'Test Title' }];
      mockRealisationsService.findAll.mockResolvedValue(realisations);
      
      const result = await controller.findAll();
      expect(result).toEqual(realisations);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  // Test findOne method
  describe('findOne', () => {
    it('should return one realisation', async () => {
      const realisation = { title: 'Test Title' };
      mockRealisationsService.findOne.mockResolvedValue(realisation);

      const result = await controller.findOne({ id: 'some-id' });
      expect(result).toEqual(realisation);
      expect(service.findOne).toHaveBeenCalledWith('some-id');
    });
  });

  // Test updateRealisation method
  describe('updateRealisation', () => {
    it('should call the service update method', async () => {
      const dto: UpdateRealisationDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        imageUrls: [],
        imagesToDelete: []
      };
      const updatedRealisation = { title: 'Updated Title' };
      mockRealisationsService.updateRealisation.mockResolvedValue(updatedRealisation);
      
      const result = await controller.updateRealisation([], dto, { id: 'some-id' });
      expect(service.updateRealisation).toHaveBeenCalledWith('some-id', dto);
      expect(result).toEqual(updatedRealisation);
    });
  });

  // Test deleteRealisation method
  describe('deleteRealisation', () => {
    it('should call the service delete method', async () => {
      const message = { message: 'Réalisation supprimée avec succès' };
      mockRealisationsService.deleteRealisation.mockResolvedValue(message);

      const result = await controller.deleteRealisation({ id: 'some-id' });
      expect(service.deleteRealisation).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(message);
    });
  });
});
