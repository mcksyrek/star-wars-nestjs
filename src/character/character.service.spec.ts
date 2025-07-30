import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Repository } from 'typeorm';

const mockCharacter: Character = {
  id: 1,
  name: 'Luke Skywalker',
  episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
  planet: 'Tatooine',
};

describe('CharacterService', () => {
  let service: CharacterService;
  let repo: jest.Mocked<Repository<Character>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    repo = module.get(getRepositoryToken(Character));
  });

  it('should return all characters', async () => {
    repo.find.mockResolvedValue([mockCharacter]);
    const result = await service.findAll();
    expect(result).toEqual([mockCharacter]);
  });

  it('should return one character by id', async () => {
    repo.findOneBy.mockResolvedValue(mockCharacter);
    const result = await service.findOne(1);
    expect(result).toEqual(mockCharacter);
  });

  it('should throw if character not found', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toThrow('Character with id 99 not found');
  });

  it('should create a new character', async () => {
    repo.create.mockReturnValue(mockCharacter);
    repo.save.mockResolvedValue(mockCharacter);
    const result = await service.create({
      name: 'Luke Skywalker',
      episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
      planet: 'Tatooine',
    });
    expect(result).toEqual(mockCharacter);
  });

  it('should update character', async () => {
    repo.findOneBy.mockResolvedValue({ ...mockCharacter });
    repo.save.mockResolvedValue({ ...mockCharacter, planet: 'Dagobah' });

    const result = await service.update(1, { planet: 'Dagobah' });
    expect(result.planet).toBe('Dagobah');
  });

  it('should delete character', async () => {
    repo.delete.mockResolvedValue({ affected: 1, raw: {} });
    const result = await service.delete(1);
    expect(result).toBe(true);
  });

  it('should return false if nothing deleted', async () => {
    repo.delete.mockResolvedValue({ affected: 0, raw: {} });
    const result = await service.delete(999);
    expect(result).toBe(false);
  });
});
