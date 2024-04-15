import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Country } from "./country";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  continent: string;

  @OneToMany(() => Country, (c) => c.continent)
  countries: Country;
}

@InputType()
export class NewCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}
