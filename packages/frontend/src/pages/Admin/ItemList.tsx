import React, { useEffect } from 'react';
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



export default function ItemList() {

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

  



  return (
    <div>
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
