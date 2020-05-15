import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Order, OrderModel } from "../entities/Order";
import { OrderInput } from "./types/Order-input";

@Resolver((_of) => Order)
export class OrderResolver {
  @Query((_returns) => Order, { nullable: false })
  async returnSingleOrder(@Arg("id") id: string) {
    return await OrderModel.findById({ _id: id});
  }

  @Query(() => [Order])
  async returnAllOrders() {
    return await OrderModel.find();
  }

  @Mutation(() => Order)
  async createOrder(@Arg("data") {number, user, items}: OrderInput): Promise<Order> {

    const existingOrder = OrderModel.findOne( {number: number});
    if(existingOrder)
    {
      throw new Error("Order exists already.");
    }

    const Order = (
      await OrderModel.create({
        number,
        user,
        items
      })
    ).save();
    return Order;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg("id") id: string) {
    await OrderModel.deleteOne({ _id: id });
    return true;
  }
}
