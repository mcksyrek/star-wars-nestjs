import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

@InputType()
export class CreateCharacterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  episodes: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  planet?: string;
}
