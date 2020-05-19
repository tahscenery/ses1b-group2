import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";

@ObjectType({ description: "The Product model" })
export  class Product {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  color: string;

  @Field(_type => Int)
  @Property()
  stock: number;

  @Field(_type => Int)
  @Property()
  price: number;
}

export const ProductModel = getModelForClass(Product);
