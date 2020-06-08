import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
// import { Ref } from "../types";
// import { User } from "./User";
import { Table } from "./Table";
import { ObjectId } from "mongodb";
import { __Type } from "graphql";

@ObjectType({ description: "The Order model" })
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Property({ required: true })
  userId: ObjectId;

  @Field(() => String)
  @Property({ ref: Table, required: true })
  tableId: ObjectId;

  @Field(() => Date)
  @Property({ required: true })
  date: Date;

  @Field()
  @Property({ required: true })
  location: string;

  @Field()
  @Property({ required: true })
  numberOfPeople: number;

  @Field()
  @Property({ required: true })
  totalPrice: number;

  @Field(() => [String])
  @Property({ required: true })
  items: string[];
}

export const OrderModel = getModelForClass(Order);
