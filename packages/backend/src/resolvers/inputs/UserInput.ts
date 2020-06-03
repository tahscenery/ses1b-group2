import { InputType, Field} from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { User } from "../../entities/User";

@InputType()
class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 255)
  password: string;
}

export default UserInput;
