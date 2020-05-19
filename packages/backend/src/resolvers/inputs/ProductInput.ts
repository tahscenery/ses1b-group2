import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { Product } from "../../entities/Product";

@InputType()
class ProductInput implements Partial<Product> {
  @Field()
  name: string;

  @Field()
  @Length(1, 255)
  description: string;

  @Field()
  color: string;

  @Field()
  stock: number;

  @Field()
  price: number;
}

export default ProductInput;
