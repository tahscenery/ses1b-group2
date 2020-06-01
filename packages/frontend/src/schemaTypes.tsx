/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCustomer
// ====================================================

export interface getCustomer_allUsers {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface getCustomer {
  allUsers: getCustomer_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addCustomer
// ====================================================

export interface addCustomer {
  Register: boolean;
}

export interface addCustomerVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCustomer
// ====================================================

export interface updateCustomer {
  updateUser: boolean;
}

export interface updateCustomerVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteCustomer
// ====================================================

export interface deleteCustomer {
  deleteUser: boolean;
}

export interface deleteCustomerVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOrder
// ====================================================

export interface getOrder_allOrders {
  __typename: "Order";
  id: string;
  date: any;
  location: string;
  numberOfPeople: number;
  userId: string;
  tableId: string;
}

export interface getOrder {
  allOrders: getOrder_allOrders[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteBookings
// ====================================================

export interface deleteBookings {
  deleteOrder: boolean;
}

export interface deleteBookingsVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStaff
// ====================================================

export interface getStaff_allStaff {
  __typename: "Staff";
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface getStaff {
  allStaff: getStaff_allStaff[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addStaff
// ====================================================

export interface addStaff {
  addStaff: boolean;
}

export interface addStaffVariables {
  username: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateStaff
// ====================================================

export interface updateStaff {
  updateStaff: boolean;
}

export interface updateStaffVariables {
  username: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteStaff
// ====================================================

export interface deleteStaff {
  deleteStaff: boolean;
}

export interface deleteStaffVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: displayTable
// ====================================================

export interface displayTable_allTables {
  __typename: "Table";
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

export interface displayTable {
  allTables: displayTable_allTables[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addTables
// ====================================================

export interface addTables {
  addTables: boolean;
}

export interface addTablesVariables {
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateTables
// ====================================================

export interface updateTables {
  updateTables: boolean;
}

export interface updateTablesVariables {
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTable
// ====================================================

export interface deleteTable {
  deleteTable: boolean;
}

export interface deleteTableVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOrders
// ====================================================

export interface getOrders_allOrdersForUser {
  __typename: "Order";
  id: string;
  date: any;
  location: string;
  numberOfPeople: number;
  items: string[];
}

export interface getOrders {
  allOrdersForUser: getOrders_allOrdersForUser[];
}

export interface getOrdersVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteOrder
// ====================================================

export interface deleteOrder {
  deleteOrder: boolean;
}

export interface deleteOrderVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetMutation
// ====================================================

export interface resetMutation {
  ResetPassword: boolean;
}

export interface resetMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_Login {
  __typename: "LoginResponse";
  accessToken: string;
  userId: string;
}

export interface LoginUser {
  Login: LoginUser_Login;
}

export interface LoginUserVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder {
  createOrder: boolean;
}

export interface createOrderVariables {
  userId: string;
  tableId: string;
  date: any;
  location: string;
  numberOfPeople: number;
  items: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubcription {
  __typename: "User";
  id: string;
  email: string;
}

export interface CreateSubscriptionMutation {
  createSubcription: CreateSubscriptionMutation_createSubcription;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getItemsSelectItems
// ====================================================

export interface getItemsSelectItems_allItems {
  __typename: "Item";
  id: string;
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
  image: string;
}

export interface getItemsSelectItems {
  allItems: getItemsSelectItems_allItems[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTables
// ====================================================

export interface getTables_allTables {
  __typename: "Table";
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

export interface getTables {
  allTables: getTables_allTables[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser {
  Register: boolean;
}

export interface RegisterUserVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getItemsViewMenu
// ====================================================

export interface getItemsViewMenu_allItems {
  __typename: "Item";
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
}

export interface getItemsViewMenu {
  allItems: getItemsViewMenu_allItems[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration representing the category of a menu item. Possible values: ENTREE, SALAD, MAIN, DESSERT.
 */
export enum ItemCategory {
  DESSERT = "DESSERT",
  ENTREE = "ENTREE",
  MAIN = "MAIN",
  SALAD = "SALAD",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
