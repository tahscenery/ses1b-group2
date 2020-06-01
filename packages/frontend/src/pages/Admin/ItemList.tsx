import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { getItems, addItems, addItemsVariables, updateItems, updateItemsVariables, deleteItem, deleteItemVariables } from "../../schemaTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

enum ItemCategory {
  ENTREE = "ENTREE",
  SALAD = "SALAD",
  MAIN = "MAIN",
  DESSERT = "DESSERT",
}

interface Row {
  name: string;
  description: string;
  price: number;
  category: ItemCategory;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const GET_ITEMS = gql`
query getItems{
  allItems{
    name
    description
    price
    category

  }
}`;

const ADD_ITEMS = gql`
mutation addItems($name: String!, $description: String!, $price: Float!, $category: ItemCategory!){
  addItem(name: $name, description: $description, price: $price, category:$category)
}`;

const UPDATE_ITEMS = gql`
mutation updateItems($name: String!, $description: String!, $price: Float!, $category: ItemCategory!){
  updateItem(name: $name, description: $description, price: $price, category:$category)
}`;

const DELETE_ITEMS = gql`
mutation deleteItem($name: String!){
  deleteItem(name: $name)
}`;

export default function ItemList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Price', field: 'price' },
        { title: 'Category', field: 'category' },
      ],
    datas:
      [
        
      ]
  });

  const { loading, error, data} = useQuery<getItems>(GET_ITEMS);
  const [add_Item] = useMutation<addItems,addItemsVariables>(ADD_ITEMS);
  const [update_Item] = useMutation<updateItems,updateItemsVariables>(UPDATE_ITEMS);
  const [delete_Item] = useMutation<deleteItem,deleteItemVariables>(DELETE_ITEMS);

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Item List"
        columns={state.columns}
        data={data.allItems}
        
        editable={{

          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                add_Item({variables: {name: newData.name, description: newData.description, price: newData.price as number, category: newData.category}})
                setState((prevState) => {
                  const data = [...prevState.datas];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                update_Item({variables: {name: newData.name, description: newData.description, price: newData.price as number, category: newData.category}})
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.datas];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                delete_Item({variables: {name: oldData.name}});
                setState((prevState) => {
                  const data = [...prevState.datas];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}

/*
<Card>
  <CardHeader>Query - Displaying all data</CardHeader>
  <CardBody>
    <pre>
      {JSON.stringify(getAllCustomers.data, null, 2)}
    </pre>
  </CardBody>
</Card>
*/

/*
<table>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {data && data.returnAllStaffs.map((staff: any) => (
            <tr>
              <td>{staff.id}</td>
              <td>{staff.username}</td>
              <td>{staff.email}</td>
              <td>{staff.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        data && data.returnAllStaffs.map((staff:any) => (
          <MyTable rows={staff} />
        ))
      }
*/
