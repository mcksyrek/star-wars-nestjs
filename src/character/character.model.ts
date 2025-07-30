import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field()
  name: string;

  @Field(() => [String])
  episodes: string[];

  @Field({ nullable: true })
  planet?: string;
}
