import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async findAll(limit = 10, offset = 0): Promise<Character[]> {
    return this.characterRepository.find({
      skip: offset,
      take: limit,
      order: { id: 'ASC' },
    });
  }  

  async findOne(id: number): Promise<Character> {
    const character = await this.characterRepository.findOneBy({ id });
    if (!character) {
      throw new Error(`Character with id ${id} not found`);
    }
    return character;
  }

  async create(input: CreateCharacterInput): Promise<Character> {
    const character = this.characterRepository.create(input);
    return this.characterRepository.save(character);
  }

  async createMany(inputs: CreateCharacterInput[]): Promise<Character[]> {
    const entities = this.characterRepository.create(inputs);
    return this.characterRepository.save(entities);
  }

  async update(id: number, input: UpdateCharacterInput): Promise<Character> {
    const character = await this.findOne(id);
    Object.assign(character, input);
    return this.characterRepository.save(character);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.characterRepository.delete(id);
    return !!result.affected && result.affected > 0;
}
}
