import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { Admin } from "../../entities/Admin";

@InputType()
export class AdminInput implements Partial<Admin>{

  @Field()
  @IsEmail()
  email: String;

  @Field()
  password: String;
}