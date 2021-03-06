import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Identifiable } from "../types";

@ObjectType({ description: "The User model" })
export class User implements Identifiable {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  password: string;

  @Field()
  stripe_id: string;

  @Field()
  type: string;
}

export const UserModel = getModelForClass(User);
