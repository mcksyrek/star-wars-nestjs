import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field(() => [String])
  episodes: string[];

  @Field({ nullable: true })
  planet?: string;
}
