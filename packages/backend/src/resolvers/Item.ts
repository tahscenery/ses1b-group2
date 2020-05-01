import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import { ItemInput } from "./types/item-input";

@Resolver()
export class ItemResolver {
  @Query((_returns) => Item, { nullable: false })
  async returnSingleItem(@Arg("id") id: string) {
    return await ItemModel.findById({ _id: id });
  }

  @Query(() => [Item])
  async returnAllItem() {
    return await ItemModel.find();
  }

  @Mutation(() => Item)
  async createItem(
    @Arg("data") { name, description, price }: ItemInput
  ): Promise<Item> {
    const item = (
      await ItemModel.create({
        name,
        description,
        price,
      })
    ).save();
    return item;
  }

  @Mutation(() => Boolean)
  async deleteItem(@Arg("id") id: string) {
    await ItemModel.deleteOne({ id });
    return true;
  }
}
