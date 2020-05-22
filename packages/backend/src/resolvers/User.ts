import {
  Resolver,
  Mutation,
  Arg,
  Query,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { User, UserModel } from "../entities/User";
import { UserInput } from "./inputs";
import { isAuth } from "./isAuth";
import { MyContext } from "./MyContext";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  userId: string;
}

@Resolver(_of => User)
class UserResolver {
  @Query(() => User, { nullable: false })
  async user(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query((_returns) => User, { nullable: false })
  async getEmail(@Arg("email") email : string) {
    return await UserModel.findOne({ email: email});
  }

  @Query(() => [User])
  async allUsers() {
    return await UserModel.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext) {
    return `Your user id : ${payload!.userId}`;
  }

  @Mutation(() => LoginResponse)
  async Login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await UserModel.findOne({ email:  email });
    if (!user) {
      throw new Error("Could not find user");
    }

    const verify = await bcrypt.compare(password, user.password as string);
    if (!verify) {
      throw new Error("Invalid Password");
    }
    
    return {
      accessToken: sign({ userId: user.id }, "MySecretKey", {
        expiresIn: "15m"
      }),
      userId: user.id
    };
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") { name, email, password }: UserInput
  ): Promise<User> {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      throw new Error("User exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = (
      await UserModel.create({
        name,
        email,
        password: hashedPassword,
      })
    ).save();
    return user;
  }

  @Mutation(() => Boolean)
  async Register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      throw new Error("User exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    // let user = null;
    try {
      await UserModel.create({
        name,
        email,
        password: hashedPassword
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) 
  {
    await UserModel.deleteOne({ _id: id });
    return true;
  }
}

export default UserResolver;
