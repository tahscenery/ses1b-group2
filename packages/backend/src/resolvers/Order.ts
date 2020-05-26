import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from "type-graphql";
import { Order, OrderModel } from "../entities/Order";
import { User, UserModel } from "../entities/User";
//import { Item, ItemModel } from "../entities/Item";
//import { Table, TableModel } from "../entities/Table";
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
  async createOrder(@Arg("data") {orderNumber, user_id, item_id, table_id, date, location, numberOfPeople}: OrderInput): Promise<Boolean> {

    const existingOrder = await OrderModel.findOne( {orderNumber: orderNumber});
    if (existingOrder) {
      throw new Error("Order exists already.");
    }

    try {
      await OrderModel.create({
        orderNumber,
        user_id,
        item_id,
        table_id,
        numberOfPeople,
        location, 
        date
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg("id") id: string) {
    await OrderModel.deleteOne({ _id: id });
    return true;
  }

  @FieldResolver(_type => (User))
  async user(@Root() order: Order): Promise<User> {
    console.log(order, "user!")
    return (await UserModel.findById(order._doc.user_id))!;
  }
/*
  @FieldResolver(_type => (Item))
  async item(@Root() order: Order): Promise<Item> {
    console.log(order, "item!")
    return (await ItemModel.findById(order._doc.item_id))!;
  }

  @FieldResolver(_type => (Table))
  async table(@Root() order: Order): Promise<Table> {
    console.log(order, "table!")
    return (await TableModel.findById(order._doc.table_id))!;
  }
  */
}

export default OrderResolver;