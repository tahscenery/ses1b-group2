import React, { Fragment } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
import ReactTable from 'react-table'
import { MyTable } from './Table'

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

const GET_DATA = gql`
query staff{
  returnAllStaffs{
    id
    key
    username
    email
    password
  }
}`;

export default function Customer() {

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
        { id: "1", username: 'Bryan', email: "bryan@yahoo.com", password: "123" },
        { id: "2", username: 'Colin', email: "colin@yahoo.com", password: "123" }
      ]
  });

  const { loading, error, data } = useQuery(GET_DATA);

  return (
    <div>
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

      <MaterialTable
        title="Customer List"
        columns={state.columns}
        data={state.datas}

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
<MaterialTable
  title="Customer List"
  columns={state.columns}
  data={state.data}
  editable={{
    onRowAdd: (newData) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          setState((prevState) => {
            const data = [...prevState.data];
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
              const data = [...prevState.data];
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
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        }, 600);
      }),
  }}
/>
*/
