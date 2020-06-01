import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {getStaff, addStaff, addStaffVariables, updateStaff, updateStaffVariables, deleteStaff, deleteStaffVariables} from "../../schemaTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const GET_STAFF = gql`
query getStaff{
  allStaff{
    id
    username
    email
    password
  }
}`;

const CREATE_STAFF = gql`
mutation addStaff($username: String!, $email: String!, $password: String!) {
  addStaff(username: $username, email: $email, password: $password)   
}`;

const UPDATE_STAFF = gql`
mutation updateStaff($username: String!, $email: String!, $password: String!) {
  updateStaff(username: $username, email: $email, password: $password)   
}`;

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

  const { loading, error, data } = useQuery<getStaff>(GET_STAFF);
  const [add_Staff] = useMutation<addStaff, addStaffVariables>(CREATE_STAFF);
  const [update_Staff] = useMutation<updateStaff, updateStaffVariables>(UPDATE_STAFF);
  const [delete_Staff] = useMutation<deleteStaff, deleteStaffVariables>(DELETE_STAFF);

  if (loading) return<LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
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
                add_Staff({ variables: { username: newData.username, email: newData.email, password: newData.password } });
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
                update_Staff({ variables: { username: newData.username, email: newData.email, password: newData.password } });
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
                delete_Staff( {variables: { id: oldData.id}} );
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