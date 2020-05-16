import { InputType, Field } from "type-graphql";
import { Table } from "../../entities/Table";

@InputType()
export class TableInput implements Partial<Table>{
  
  @Field()
  tableNumber: number;
  
  @Field()
  minCapacity: number;
  
  @Field()
  maxCapacity: number;

  @Field()
  description: String;
}