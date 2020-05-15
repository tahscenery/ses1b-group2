import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType({ description: "The Order model" })
export class Order {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  user : User;

  @Field()
  @Property({ required: true })
  items: [Product];
}

export const OrderModel = getModelForClass(Order);
