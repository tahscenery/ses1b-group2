import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Identifiable } from "../types";

@ObjectType({ description: "The Table model" })
export class Table implements Identifiable {
  @Field(() => ID)
  id: string;

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
  description: string;
}

export const TableModel = getModelForClass(Table);
