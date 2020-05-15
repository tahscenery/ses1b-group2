import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Admin model" })
export class Admin {
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  email: String;

  @Field()
  @Property({ required: true })
  password: String;
}

export const AdminModel = getModelForClass(Admin);
