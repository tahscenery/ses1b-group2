import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { Admin } from "../../entities/Admin";

@InputType()
class AdminInput implements Partial<Admin>{
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export default AdminInput;
