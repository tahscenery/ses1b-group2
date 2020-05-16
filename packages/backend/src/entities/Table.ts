import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Table model" })
export class Table {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  tableNumber: number;

  @Field()
  @Property({ required: true })
  minCapacity: number;

  @Field()
  @Property({ required: true })
  maxCapacity: number;

  @Field()
  @Property({ required: true })
  description: String;
}

export const TableModel = getModelForClass(Table);
