import React from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {getOrder, addTables, addTablesVariables, updateTables, updateTablesVariables, deleteTable, deleteTableVariables} from "../../schemaTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Row {
  id: string;
  orderNumber: number;
  date: Date;
  location: string;
  numberOfPeople: number;
  user_id: string;
  item_id: string;
  table_id: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const DISPLAY_ORDER = gql`
query getOrder{
  allOrders{
    id
    orderNumber
    date
    location
    numberOfPeople
    user_id
    item_id
    table_id
  }
}`;

export default function OrderList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id', type:'numeric'},
        { title: 'Order Number', field: 'orderNumber'},
        { title: 'Customer', field: 'user_id'},
        { title: 'Item', field: 'item_id'},
        { title: 'Table', field: 'table_id'},
        { title: 'Date & Time', field: 'date' },
        { title: 'Location', field: 'location' },
        { title: 'Number of People', field: 'numberOfPeople' },
      ],
    datas:
      [
      ]
  });

  const { loading, error, data } = useQuery<getOrder>(DISPLAY_ORDER);


  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Booking List"
        columns={state.columns}
        data={data.allOrders}

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