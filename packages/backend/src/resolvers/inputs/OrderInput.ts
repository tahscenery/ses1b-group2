import { InputType, Field, ID } from "type-graphql";
import { Order } from "../../entities/Order";
import { ObjectId } from "mongodb";
//import { User } from "../../entities/User";
//import { Item } from "../../entities/Item";

@InputType()
class OrderInput implements Partial<Order>{

  @Field()
  orderNumber : number;

  @Field(()=> ID)
  user_id: ObjectId; 

  @Field(()=> ID)
  item_id: ObjectId; 

  @Field()
  date : Date;

  @Field()
  location : String;

  @Field()
  numberOfPeople : number;
}

export default OrderInput;
