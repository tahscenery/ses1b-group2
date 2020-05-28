/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TableQuery
// ====================================================

export interface TableQuery_allTables {
  __typename: "Table";
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

export interface TableQuery {
  allTables: TableQuery_allTables[];
}

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
// GraphQL query operation: getMe
// ====================================================

export interface getMe {
  Me: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loggedin
// ====================================================

export interface loggedin_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface loggedin {
  user: loggedin_user;
}

export interface loggedinVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_Login {
  __typename: "LoginResponse";
  accessToken: string;
  userId: string;
}

export interface LoginMutation {
  Login: LoginMutation_Login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
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
// GraphQL query operation: getItems
// ====================================================

export interface getItems_allItems {
  __typename: "Item";
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
}

export interface getItems {
  allItems: getItems_allItems[];
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
