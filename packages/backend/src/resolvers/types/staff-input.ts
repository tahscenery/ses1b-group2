import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { Staff } from "../../entities/Staff";

@InputType()
export class StaffInput implements Partial<Staff>{
  @Field()
  @Length(1, 255)
  username: String;

  @Field()
  @IsEmail()
  email: String;

  @Field()
  password: String;
}