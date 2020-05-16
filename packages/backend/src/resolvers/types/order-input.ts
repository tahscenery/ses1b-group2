import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";
import { Product } from "../../entities/Product";

@InputType()
export class OrderInput implements Partial<Order>{
  
  @Field()
  number: number;
  
  @Field()
  user: User;
  
  @Field()
  items: [Product];
}