import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCharacterInput } from './create-character.input';
import { IsOptional, IsString, IsArray } from 'class-validator';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  episodes?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  planet?: string;
}
