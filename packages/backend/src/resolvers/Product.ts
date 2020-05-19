import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Product, ProductModel } from "../entities/Product";
import { ProductInput } from "./inputs";

@Resolver((_of) => Product)
class ProductResolver {
  @Query((_returns) => Product, { nullable: false })
  async product(@Arg("id") id: string) {
    return await ProductModel.findById({ _id: id });
  }

  @Query(() => [Product])
  async allProducts() {
    return await ProductModel.find();
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("data") { name, description, color, stock, price }: ProductInput
  ): Promise<Product> {
    const product = (
      await ProductModel.create({
        name,
        description,
        color,
        stock,
        price,
      })
    ).save();
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: string) {
    await ProductModel.deleteOne({ id });
    return true;
  }
}

export default ProductResolver;
