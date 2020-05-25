import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../types";
import { User } from "./User";
import { Item } from "./Item";

@ObjectType({ description: "The Order model" })
export class Order {
  @Field(() => ID)
  id: string;

  @Field(_type => String)
  @Property({ ref: User, required: true })
  user_id: Ref<User>;
  _doc: any;

  @Field(_type => String)
  @Property({ ref: Item, required: true })
  item_id: Ref<Item>;

  @Field()
  @Property({ required: true })
  orderNumber : number;

  @Field()
  @Property({ required: true })
  date : Date;

  @Field()
  @Property({ required: true })
  location : String;

  @Field()
  @Property({ required: true })
  numberOfPeople : number;

}

export const OrderModel = getModelForClass(Order);
