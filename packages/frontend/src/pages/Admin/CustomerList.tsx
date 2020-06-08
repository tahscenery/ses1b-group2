import React from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { getCustomer, addCustomer, addCustomerVariables, updateCustomer, updateCustomerVariables, deleteCustomer, deleteCustomerVariables } from "../../schemaTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Row {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const GET_CUSTOMER = gql`
query getCustomer{
  allUsers{
    id
    name
    email
    password
  }
}`;

const CREATE_CUSTOMER = gql`
mutation addCustomer($name: String!, $email: String!, $password: String!) {
  Register(name: $name, email: $email, password: $password)
}`;

const UPDATE_CUSTOMER = gql`
mutation updateCustomer($name: String!, $email: String!, $password: String!) {
  updateUser(name: $name, email: $email, password: $password)
}`;

const DELETE_CUSTOMER = gql`
mutation deleteCustomer($id: String!){
  deleteUser(id: $id)
}`;

export default function CustomerList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id', type: 'numeric' },
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Password', field: 'password' }
      ],
    datas:
      [
        { id: "1", name: "staff1", email: "staff@staff.com", password: "staff1" }
      ]
  });

  const { loading, error, data } = useQuery<getCustomer>(GET_CUSTOMER);
  const [add_Customer] = useMutation<addCustomer, addCustomerVariables>(CREATE_CUSTOMER);
  const [update_Customer] = useMutation<updateCustomer, updateCustomerVariables>(UPDATE_CUSTOMER);
  const [delete_Customer] = useMutation<deleteCustomer, deleteCustomerVariables>(DELETE_CUSTOMER);

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Customer List"
        columns={state.columns}
        data={data.allUsers}

        editable={{

          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                add_Customer({ variables: { name: newData.name, email: newData.email, password: newData.password } });
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
                update_Customer({ variables: { name: newData.name, email: newData.email, password: newData.password } });
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
                delete_Customer({ variables: { id: oldData.id } });
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
