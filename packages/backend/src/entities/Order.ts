import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import { Item } from "./Item";

@ObjectType({ description: "The Order model" })
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  user : User;

  @Field(_type => Item)
  @Property({ required: true })
  items: [Item];
}

export const OrderModel = getModelForClass(Order);
