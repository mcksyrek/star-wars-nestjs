import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  episodes?: string[];

  @Field({ nullable: true })
  planet?: string;
}
