import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Table, TableModel } from "../entities/Table";
import { TableInput } from "./inputs";

@Resolver(_of => Table)
class TableResolver {
  @Query(() => Table, { nullable: false })
  async table(@Arg("id") id: string) {
    return await TableModel.findById({ _id: id});
  }

  @Query(() => [Table])
  async allTables() {
    return await TableModel.find();
  }

  @Mutation(() => Table)
  async createTable(
    @Arg("data") { number, minCapacity, maxCapacity, description }: TableInput
  ): Promise<Table> {
    const existingTable = TableModel.findOne( {number: number});
    if(existingTable) {
      throw new Error("Table exists already.");
    }

    const Table = (
      await TableModel.create({
        number,
        minCapacity,
        maxCapacity,
        description
      })
    ).save();
    return Table;
  }

  @Mutation(() => Boolean)
  async deleteTable(@Arg("id") id: string) {
    await TableModel.deleteOne({ _id: id });
    return true;
  }
}

export default TableResolver;
