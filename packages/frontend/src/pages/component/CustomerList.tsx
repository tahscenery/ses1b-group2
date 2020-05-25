import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

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

interface CustomerData {
  allUsers: Row[];
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

interface AddResponse {
  Register: boolean;
}

interface CustomerInput {
  name: string;
  email: string;
  password: string;
}

const CREATE_CUSTOMER = gql`
mutation addCustomer($name: String!, $email: String!, $password: String!) {
  Register(name: $name, email: $email, password: $password)   
}`;

interface UpdateResponse {
  updateUser: boolean;
}

const UPDATE_CUSTOMER = gql`
mutation updateCustomer($name: String!, $email: String!, $password: String!) {
  updateUser(name: $name, email: $email, password: $password)   
}`;

interface DeleteResponse {
  deleteUser: boolean;
}

interface IdInput {
  id: String;
}

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

  const { loading, error, data } = useQuery<CustomerData>(GET_CUSTOMER);
  const [addCustomer] = useMutation<AddResponse, CustomerInput>(CREATE_CUSTOMER);
  const [updateCustomer] = useMutation<UpdateResponse, CustomerInput>(UPDATE_CUSTOMER);
  const [deleteCustomer] = useMutation<DeleteResponse, IdInput>(DELETE_CUSTOMER);

  if (loading) return<CircularProgress />;
  if (error) return <p>ERROR</p>;
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
                addCustomer({ variables: { name: newData.name, email: newData.email, password: newData.password } });
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
                updateCustomer({ variables: { name: newData.name, email: newData.email, password: newData.password } });
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
                deleteCustomer( {variables: { id: oldData.id}} );
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
