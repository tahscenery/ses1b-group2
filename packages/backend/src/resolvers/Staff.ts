import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Staff, StaffModel } from "../entities/Staff";
import { StaffInput } from "./inputs";
import bcrypt from "bcrypt";

@Resolver((_of) => Staff )
export class StaffResolver {
  @Query((_returns) => Staff, { nullable: false })
  async returnSingleStaff(@Arg("username") username : string) {
    return await StaffModel.findOne({ username: username});
  }

  @Query(() => [Staff])
  async returnAllStaffs() {
    return await StaffModel.find();
  }

  @Mutation(() => Staff)
  async createStaff(
    @Arg("data") { username, email, password }: StaffInput
  ): Promise<Staff> {
    const existingStaff = await StaffModel.findOne({ email: email});
    if(existingStaff) {
      throw new Error("Staff exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const staff = (
      await StaffModel.create({
        username,
        email,
        password: hashedPassword
      })
    ).save();
    return staff;
  }

  @Mutation(() => Boolean)
  async deleteStaff(@Arg("id") id: string) {
    await StaffModel.deleteOne({ _id: id});
    return true;
  }
}