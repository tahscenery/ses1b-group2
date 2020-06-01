import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { Item } from "./Item";
import { Table } from "./Table";
import { __Type } from "graphql";

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
  //_doc: any; // This still doesn't work // No duplicate identifier _doc

  @Field(_type => String)
  @Property({ ref: Table, required: true })
  table_id: Ref<Table>;
  //_doc: any; // This still doesn't work // No duplicate identifier _doc

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
