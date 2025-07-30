import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Character {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [String])
  @Column('simple-array')
  episodes: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  planet?: string;
}
