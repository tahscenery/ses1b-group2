import { InputType, Field } from "type-graphql";
import { Table } from "../../entities/Table";

@InputType()
class TableInput implements Partial<Table>{
  @Field()
  number: number;

  @Field()
  minCapacity: number;

  @Field()
  maxCapacity: number;

  @Field()
  description: string;
}

export default TableInput;
