import { Entity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Item model" })
@Entity()
export class Item {
  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  price: number;

  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  category: string;

  @Field()
  @Property()
  image: string;
}

export const ItemModel = getModelForClass(Item);
