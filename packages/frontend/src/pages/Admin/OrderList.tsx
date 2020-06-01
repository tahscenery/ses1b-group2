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
  date: Date;
  location: string;
  numberOfPeople: number;
  userId: string;
  tableId: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const DISPLAY_ORDER = gql`
query getOrder {
  allOrders {
    id
    date
    location
    numberOfPeople
    userId
    tableId
  }
}`;

export interface deleteOrder {
  deleteOrder: boolean;
}

export interface deleteOrderVariables {
  id: string;
}

const DELETE_BOOKINGS = gql`
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id) 
  }
`;


export default function OrderList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id'},
        { title: 'Date', field: 'date'},
        { title: 'Location', field: 'location'},
        { title: 'Number of People', field: 'numberOfPeople'},
        { title: 'Customer', field: 'userId'},
        { title: 'Table', field: 'tableId'},
      ],
    datas:
      [
      ]
  });

  const { loading, error, data } = useQuery<getOrder>(DISPLAY_ORDER);
  const [deleteOrder] = useMutation<deleteOrder, deleteOrderVariables>(DELETE_BOOKINGS);


  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Table List"
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
                deleteOrder({ variables: { id: oldData.id }});
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