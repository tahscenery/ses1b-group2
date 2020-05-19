import { Entity } from "typeorm";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

export enum ItemCategory {
  ENTREE,
  MAIN,
  DESSERT
}

registerEnumType(ItemCategory, {
  name: "ItemCategory",
  description: "An enumeration representing the category of a menu item. Possible values: ENTREE, MAIN, DESSERT."
});

@ObjectType({ description: "The Item model" })
@Entity()
export class Item {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  price: number;

  @Field()
  @Property()
  description: string;

  @Field(_type => ItemCategory)
  @Property()
  category: ItemCategory;

  @Field()
  @Property()
  image: string;
}

export const ItemModel = getModelForClass(Item);
