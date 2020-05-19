import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType({ description: "The Order model" })
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  user : User;

  @Field(_type => Product)
  @Property({ required: true })
  items: [Product];
}

export const OrderModel = getModelForClass(Order);
