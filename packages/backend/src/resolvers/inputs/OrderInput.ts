import { InputType, Field } from "type-graphql";
import { Order } from "../../entities/Order";
import { ObjectId } from "mongodb";

@InputType()
class OrderInput implements Partial<Order>{

  @Field()
  orderNumber : number;

  @Field(()=> String)
  user_id: ObjectId; 

  @Field(()=> String)
  item_id: ObjectId; 

  @Field(()=> String)
  table_id: ObjectId; 

  @Field()
  date : Date;

  @Field()
  location : String;

  @Field()
  numberOfPeople : number;
}

export default OrderInput;
