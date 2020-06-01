import React from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {displayTable, addTables, addTablesVariables, updateTables, updateTablesVariables, deleteTable, deleteTableVariables} from "../../schemaTypes";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Row {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const DISPLAY_TABLE = gql`
query displayTable{
  allTables{
    id
    tableNumber
    minCapacity
    maxCapacity
    description
  }
}`;

const ADD_TABLE = gql`
mutation addTables($tableNumber: Float!, $minCapacity: Float!, $maxCapacity: Float!, $description: String!) {
  addTables(tableNumber: $tableNumber, minCapacity: $minCapacity, maxCapacity: $maxCapacity, description: $description)
}
`;

const UPDATE_TABLE = gql`
mutation updateTables($tableNumber: Float!, $minCapacity: Float!, $maxCapacity: Float!, $description: String!) {
  updateTables(tableNumber: $tableNumber, minCapacity: $minCapacity, maxCapacity: $maxCapacity, description:$description)   
}
`;

const DELETE_TABLE = gql`
mutation deleteTable($id: String!){
  deleteTable(id: $id)
}`;

export default function TableList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id', type:'numeric'},
        { title: 'Table Number', field: 'tableNumber'},
        { title: 'Min Capacity', field: 'minCapacity'},
        { title: 'Max Capacity', field: 'maxCapacity'},
        { title: 'Description', field: 'description' }
      ],
    datas:
      [
      ]
  });

  const { loading, error, data } = useQuery<displayTable>(DISPLAY_TABLE);
  const [add_Table] = useMutation<addTables, addTablesVariables>(ADD_TABLE);
  const [update_Table] = useMutation<updateTables, updateTablesVariables>(UPDATE_TABLE);
  const [delete_Table] = useMutation<deleteTable, deleteTableVariables>(DELETE_TABLE);

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">This is an error message!</Alert>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <MaterialTable
        title="Table List"
        columns={state.columns}
        data={data.allTables}

        editable={{

          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                add_Table({ variables: { tableNumber: (newData.tableNumber as number) , minCapacity: 1, maxCapacity: 4, description: newData.description } });
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
                update_Table({ variables: { tableNumber: newData.tableNumber, minCapacity: newData.minCapacity, maxCapacity: newData.maxCapacity, description: newData.description } });
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
                delete_Table({ variables: { id: oldData.id } });
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