import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { Item, ItemCategory } from "../../entities/Item";

@InputType()
export class ItemInput implements Partial<Item> {

  @Field()
  name: string;

  @Field()
  @Length(1, 255)
  description: string;

  @Field()
  price: number;

  @Field(_type => ItemCategory)
  category: ItemCategory;

  @Field()
  image: string;

}