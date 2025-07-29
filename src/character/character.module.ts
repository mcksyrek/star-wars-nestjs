import { Module } from '@nestjs/common';
import { CharacterResolver } from './character.resolver';

@Module({
  providers: [CharacterResolver],
})
export class CharacterModule {}