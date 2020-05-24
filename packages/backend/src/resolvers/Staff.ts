import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Staff, StaffModel } from "../entities/Staff";
import { StaffInput } from "./inputs";
import bcrypt from "bcrypt";

@Resolver((_of) => Staff)
class StaffResolver {
  @Query((_returns) => Staff, { nullable: false })
  async staff(@Arg("username") username: string) {
    return await StaffModel.findOne({ username: username });
  }

  @Query(() => [Staff])
  async allStaff() {
    return await StaffModel.find();
  }

  @Mutation(() => Staff)
  async createStaff(
    @Arg("data") { username, email, password }: StaffInput
  ): Promise<Staff> {
    const existingStaff = await StaffModel.findOne({ email: email });
    if (existingStaff) {
      throw new Error("Staff exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const staff = (
      await StaffModel.create({
        username,
        email,
        password: hashedPassword,
      })
    ).save();
    return staff;
  }

  @Mutation(() => Boolean)
  async addStaff(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const existingStaff = await StaffModel.findOne({ email: email });
    if (existingStaff) {
      throw new Error("Staff exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    try {
      await StaffModel.create({
        username,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateStaff(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const existingStaff = await StaffModel.findOne({ email: email });
    if (!existingStaff) {
      throw new Error("User not found.");
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    try {
      if (password != null) {
        await StaffModel.findOneAndUpdate(
          { _id: existingStaff.id },
          { password: hashedPassword },
          { new: true }
        );
      }
      if (username != null) {
        await StaffModel.findOneAndUpdate(
          { _id: existingStaff.id },
          { username: username },
          { new: true }
        );
      }
      if (email != null) {
        await StaffModel.findOneAndUpdate(
          { _id: existingStaff.id },
          { email: email },
          { new: true }
        );
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteStaff(@Arg("id") id: string) {
    await StaffModel.deleteOne({ _id: id });
    return true;
  }
}

export default StaffResolver;
