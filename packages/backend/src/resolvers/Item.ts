import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Item, ItemModel } from "../entities/Item";
import { ItemInput } from "./inputs";

export enum ItemCategory {
  ENTREE,
  SALAD,
  MAIN,
  DESSERT
}


@Resolver()
class ItemResolver {
  @Query(() => Item, { nullable: false })
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
  async addItem(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("category") category: ItemCategory,
  ) {
    
    try {
      await ItemModel.create({
        name,
        description,
        price,
        category,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateItem(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("category") category: ItemCategory,
  ) {
    const existingItem = await ItemModel.findOne({ name: name });
    if (!existingItem) {
      throw new Error("Item not found.");
    }
    
    try {
      if (description != null) {
        await ItemModel.findOneAndUpdate(
          { _id: existingItem.id },
          { description: description },
          { new: true }
        );
      }
      if (price != null) {
        await ItemModel.findOneAndUpdate(
          { _id: existingItem.id },
          { price: price },
          { new: true }
        );
      }
      if (category != null) {
        await ItemModel.findOneAndUpdate(
          { _id: existingItem.id },
          { category: category },
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
  async deleteItem(@Arg("name") name: string) {
    await ItemModel.deleteOne({ name: name });
    return true;
  }
}

export default ItemResolver;
