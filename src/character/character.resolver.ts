import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => [Character])
  characters() {
    return this.characterService.findAll();
  }

  @Query(() => Character, { nullable: true })
  character(@Args('name') name: string) {
    return this.characterService.findOne(name);
  }

  @Mutation(() => Character)
  addCharacter(@Args('input') input: CreateCharacterInput) {
    return this.characterService.create(input);
  }

  @Mutation(() => Character)
  updateCharacter(
    @Args('name') name: string,
    @Args('input') input: UpdateCharacterInput,
  ) {
    return this.characterService.update(name, input);
  }

  @Mutation(() => Boolean)
  deleteCharacter(@Args('name') name: string) {
    return this.characterService.delete(name);
  }
}
