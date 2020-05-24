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
    @Arg("data") { tableNumber, minCapacity, maxCapacity, description }: TableInput
  ): Promise<Table> {
    const existingTable = await TableModel.findOne({ tableNumber: tableNumber });
    if (existingTable) {
      throw new Error("Table exists already.");
    }

    const table = (
      await TableModel.create({
        tableNumber,
        minCapacity,
        maxCapacity,
        description
      })
    ).save();
    return table;
  }

  @Mutation(() => Boolean)
  async addTable(
    @Arg("tableNumber") tableNumber: number,
    @Arg("minCapacity") minCapacity: number,
    @Arg("maxCapacity") maxCapacity: number,
    @Arg('description') description: string
  ) {
    const existingTable = await TableModel.findOne({ tableNumber: tableNumber });
    if (existingTable) {
      throw new Error("Table exists already.");
    }

    try {
      await TableModel.create({
        tableNumber,
        minCapacity,
        maxCapacity,
        description
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateTable(
    @Arg("tableNumber") tableNumber: number,
    @Arg("minCapacity") minCapacity: number,
    @Arg("maxCapacity") maxCapacity: number,
    @Arg('description') description: string
  ) {
    const existingTable = await TableModel.findOne({ tableNumber: tableNumber });
    if (!existingTable) {
      throw new Error("Table not found.");
    }

    try {
      if (minCapacity != null) {
        await TableModel.findByIdAndUpdate(
          { _id: existingTable.id },
          { minCapacity: minCapacity },
          { new: true }
        );
      }
      if (maxCapacity != null) {
        await TableModel.findByIdAndUpdate(
          { _id: existingTable.id },
          { maxCapacity: maxCapacity },
          { new: true }
        );
      }
      if (description != null) {
        await TableModel.findByIdAndUpdate(
          { _id: existingTable.id },
          { description: description },
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
  async deleteTable(@Arg("id") id: string) {
    await TableModel.deleteOne({ _id: id });
    return true;
  }
}

export default TableResolver;
