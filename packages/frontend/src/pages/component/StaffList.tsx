import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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

interface StaffData {
  allStaff: Row[];
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