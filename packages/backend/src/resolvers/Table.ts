import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Table, TableModel } from "../entities/Table";
import { TableInput } from "./inputs";

@Resolver((_of) => Table)
export class TableResolver {
  @Query((_returns) => Table, { nullable: false })
  async returnSingleTable(@Arg("id") id: string) {
    return await TableModel.findById({ _id: id});
  }

  @Query(() => [Table])
  async returnAllTables() {
    return await TableModel.find();
  }

  @Mutation(() => Table)
  async createTable(
    @Arg("data") { tableNumber, minCapacity, maxCapacity, description }: TableInput
  ): Promise<Table> {
    const existingTable = TableModel.findOne( {tableNumber: tableNumber});
    if(existingTable) {
      throw new Error("Table exists already.");
    }

    const Table = (
      await TableModel.create({
        tableNumber,
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
