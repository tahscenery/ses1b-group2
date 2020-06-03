import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { ObjectId } from "mongodb";

@InputType()
class OrderInput implements Partial<Order>{
  // @Field()
  // orderNumber : number;

  @Field(() => String)
  userId: ObjectId;

  // @Field(()=> String)
  // itemId: ObjectId;

  @Field(() => [String])
  items: string[];

  @Field(() => String)
  tableId: ObjectId;

  @Field(() => Date)
  date: Date;

  @Field()
  location: string;

  @Field()
  numberOfPeople: number;
}

export default OrderInput;
