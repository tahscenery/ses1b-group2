import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";
import { Item } from "../../entities/Item";

@InputType()
class OrderInput implements Partial<Order>{
  @Field()
  number: number;

  @Field()
  user: User;

  @Field(_type => Item)
  items: [Item];
}

export default OrderInput;
