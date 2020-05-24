import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { graphql } from 'react-apollo';
import { MyTable } from './Table'
// import { Query } from 'react-apollo';
// import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
// import ReactTable from 'react-table'

interface Row {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

interface StaffData {
  allStaff: Row[];
}

const GET_STAFF = gql`
query getStaff{
  allStaff{
    id
    username
    email
    password
  }
}`;

interface AddResponse {
  Register: boolean;
}

interface StaffInput {
  username: string;
  email: string;
  password: string;
}

const CREATE_STAFF = gql`
mutation addStaff($username: String!, $email: String!, $password: String!) {
  addStaff(username: $username, email: $email, password: $password)   
}`;

interface UpdateResponse {
  updateStaff: boolean;
}

const UPDATE_STAFF = gql`
mutation updateStaff($username: String!, $email: String!, $password: String!) {
  updateStaff(username: $username, email: $email, password: $password)   
}`;

interface DeleteResponse {
  deleteStaff: boolean;
}

interface IdInput {
  id: String;
}

const DELETE_STAFF = gql`
mutation deleteStaff($id: String!){
  deleteStaff(id: $id)
}`;

function Staff() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id', type: 'numeric' },
        { title: 'Username', field: 'username' },
        { title: 'Email', field: 'email' },
        { title: 'Password', field: 'password' }
      ],
    datas:
      [
        {id:"1", username:"staff1", email:"staff@staff.com", password:"staff1"}
      ]
  });

  const { loading, error, data } = useQuery<StaffData>(GET_STAFF);
  const [addStaff] = useMutation<AddResponse, StaffInput>(CREATE_STAFF);
  const [updateStaff] = useMutation<UpdateResponse, StaffInput>(UPDATE_STAFF);
  const [deleteStaff] = useMutation<DeleteResponse, IdInput>(DELETE_STAFF);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Staff List"
        columns={state.columns}
        data={data.allStaff}

        editable={{

          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                addStaff({ variables: { username: newData.username, email: newData.email, password: newData.password } });
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
                updateStaff({ variables: { username: newData.username, email: newData.email, password: newData.password } });
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
                deleteStaff( {variables: { id: oldData.id}} );
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

export default Staff;