import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { Staff } from "../../entities/Staff";

@InputType()
class StaffInput implements Partial<Staff>{
  @Field()
  @Length(1, 255)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export default StaffInput;
