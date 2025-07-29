import { Injectable } from '@nestjs/common';
import { Character } from './character.model';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharacterService {
  private characters: Character[] = [
    { name: 'Luke Skywalker', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
    { name: 'Leia Organa', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'], planet: 'Alderaan' },
    { name: 'Darth Vader', episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'] },
  ];

  findAll(): Character[] {
    return this.characters;
  }

  findOne(name: string): Character | undefined{
    return this.characters.find(c => c.name === name);
  }

  create(input: CreateCharacterInput): Character {
    const newCharacter: Character = {
      name: input.name,
      episodes: input.episodes,
      planet: input.planet,
    };
    this.characters.push(newCharacter);
    return newCharacter;
  }

  update(name: string, input: UpdateCharacterInput): Character {
    const index = this.characters.findIndex(c => c.name === name);
    if (index === -1) throw new Error('Character not found');

    const existing = this.characters[index];
    const updated = {
      ...existing,
      ...input,
    };

    this.characters[index] = updated;
    return updated;
  }

  delete(name: string): boolean {
    const index = this.characters.findIndex(c => c.name === name);
    if (index === -1) return false;

    this.characters.splice(index, 1);
    return true;
  }
}
