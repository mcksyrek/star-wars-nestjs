import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Character } from './character.entity';
import { CharacterService } from './character.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => [Character])
  characters(
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
    @Args('offset', { type: () => Number, nullable: true }) offset?: number,
  ) {
    return this.characterService.findAll(limit, offset);
}

  @Query(() => Character, { nullable: true })
  character(@Args('id', { type: () => Number }) id: number) {
    return this.characterService.findOne(id);
  }
  
  @Mutation(() => Character)
  addCharacter(@Args('input') input: CreateCharacterInput) {
    return this.characterService.create(input);
  }
  
  @Mutation(() => Character)
  updateCharacter(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') input: UpdateCharacterInput,
  ) {
    return this.characterService.update(id, input);
  }
  
  @Mutation(() => Boolean)
  deleteCharacter(@Args('id', { type: () => Number }) id: number) {
    return this.characterService.delete(id);
  }  
}
