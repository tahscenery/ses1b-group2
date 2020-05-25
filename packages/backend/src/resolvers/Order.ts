import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Order, OrderModel } from "../entities/Order";
import OrderInput from "./inputs/OrderInput";

@Resolver((_of) => Order)
class OrderResolver {
  @Query((_returns) => Order, { nullable: false })
  async order(@Arg("id") id: string) {
    return await OrderModel.findById({ _id: id});
  }

  @Query(() => [Order])
  async allOrders() {
    return await OrderModel.find();
  }

  @Mutation(() => Boolean)
  async createOrder(@Arg("data") {orderNumber, user_id, item_id, date, location, numberOfPeople}: OrderInput): Promise<Boolean> {

    const existingOrder = await OrderModel.findOne( {orderNumber: orderNumber});
    if (existingOrder) {
      throw new Error("Order exists already.");
    }

    
      await OrderModel.create({
        orderNumber,
        user_id,
        item_id,
        numberOfPeople,
        location, 
        date
      });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg("id") id: string) {
    await OrderModel.deleteOne({ _id: id });
    return true;
  }
}

export default OrderResolver;