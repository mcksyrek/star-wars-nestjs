import { Query, Resolver } from '@nestjs/graphql';
import { Character } from './character.model';

@Resolver(() => Character)
export class CharacterResolver {
  @Query(() => [Character])
  characters(): Character[] {
    return [
      { name: 'Luke Skywalker' },
      { name: 'Darth Vader' },
      { name: 'Leia Organa' },
    ];
  }
}