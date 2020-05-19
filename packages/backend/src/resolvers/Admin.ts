import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Admin, AdminModel } from "../entities/Admin";
import { AdminInput } from "./inputs";
import bcrypt from "bcrypt";

@Resolver((_of) => Admin )
class AdminResolver {
  @Query((_returns) => Admin, { nullable: false })
  async returnSingleAdmin(@Arg("id") id: string) {
    return await AdminModel.findById({ _id: id});
  }

  @Query(() => [Admin])
  async returnAllAdmins() {
    return await AdminModel.find();
  }

  @Mutation(() => Admin)
  async createAdmin(@Arg("data") {email, password}: AdminInput): Promise<Admin> {
    const existingAdmin = AdminModel.findOne( {email: email});
    if (existingAdmin) {
      throw new Error("Admin exists already.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = (
      await AdminModel.create({
        email,
        password: hashedPassword
      })
    ).save();
    return admin;
  }

  @Mutation(() => Boolean)
  async deleteAdmin(@Arg("id") id: string) {
    await AdminModel.deleteOne({ _id: id });
    return true;
  }
}

export default AdminResolver;
