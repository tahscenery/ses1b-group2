import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { ObjectId } from "mongodb";

@InputType()
class OrderInput implements Partial<Order>{
  @Field(() => String)
  userId: ObjectId;

  @Field(() => String)
  tableId: ObjectId;

  @Field(() => Date)
  date: Date;

  @Field()
  location: string;

  @Field()
  numberOfPeople: number;

  @Field()
  totalPrice: number;

  @Field(() => [String])
  items: string[];
}

export default OrderInput;
