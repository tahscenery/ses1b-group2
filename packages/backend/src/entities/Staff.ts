import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Staff model" })
export class Staff {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({ required: true })
  key: string;

  @Field()
  @Property({ required: true })
  username: string;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export const StaffModel = getModelForClass(Staff);
