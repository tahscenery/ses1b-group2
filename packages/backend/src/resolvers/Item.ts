import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import { ItemInput } from "./inputs";

@Resolver()
export class ItemResolver {
  @Query((_returns) => Item, { nullable: false })
  async item(@Arg("id") id: string) {
    return await ItemModel.findById({ _id: id });
  }

  @Query(() => [Item])
  async allItems() {
    return await ItemModel.find();
  }

  @Mutation(() => Item)
  async createItem(
    @Arg("data") { name, description, price, category, image }: ItemInput
  ): Promise<Item> {
    const item = (
      await ItemModel.create({
        name,
        description,
        price,
        category,
        image,
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
