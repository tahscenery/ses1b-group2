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

  @Query(() => [Order])
  async allOrdersForUser(@Arg("userId") userId: string) {
    const order = await this.allOrders();
    return order.filter(order => order.userId.toHexString() == userId);
  }

  @Mutation(() => Boolean)
  async createOrder(
    @Arg("data") {
      userId,
      items,
      tableId,
      date,
      location,
      numberOfPeople,
      totalPrice,
    }: OrderInput
  ): Promise<Boolean> {
    // const existingOrder = await OrderModel.findOne({ orderNumber: orderNumber });
    // if (existingOrder) {
    //   throw new Error("Order exists already.");
    // }

    try {
      await OrderModel.create({
        userId,
        tableId,
        date,
        location,
        numberOfPeople,
        totalPrice,
        items,
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
    // return (await UserModel.findById(order._doc.user_id))!;
    return (await UserModel.findById(order.userId))!;
  }

  // @FieldResolver(_type => (Item))
  // async item(@Root() order: Order): Promise<Item> {
  //   console.log(order, "item!")
  //   return (await ItemModel.findById(order._doc.item_id))!;
  // }

  // @FieldResolver(_type => (Table))
  // async table(@Root() order: Order): Promise<Table> {
  //   console.log(order, "table!")
  //   return (await TableModel.findById(order._doc.table_id))!;
  // }
}

export default OrderResolver;
