import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";
import { Product } from "../../entities/Product";

@InputType()
class OrderInput implements Partial<Order>{
  @Field()
  number: number;

  @Field()
  user: User;

  @Field(_type => Product)
  items: [Product];
}

export default OrderInput;
