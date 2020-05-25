import React from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';


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

interface TableData {
  allTables: Row[];
}

const GET_TABLE = gql`
query getTable{
  allTables{
    id
    tableNumber
    minCapacity
    maxCapacity
    description
  }
}`;

interface AddResponse {
  addTables: boolean;
}

interface Input {
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

const ADD_TABLE = gql`
mutation addTables($tableNumber: Float!, $minCapacity: Float!, $maxCapacity: Float!, $description: String!) {
  addTables(tableNumber: $tableNumber, minCapacity: $minCapacity, maxCapacity: $maxCapacity, description: $description)
}
`;

interface UpdateResponse {
  updateTables: boolean;
}

const UPDATE_TABLE = gql`
mutation updateTables($tableNumber: Float!, $minCapacity: Float!, $maxCapacity: Float!, $description: String!) {
  updateTables(tableNumber: $tableNumber, minCapacity: $minCapacity, maxCapacity: $maxCapacity, description:$description)   
}
`;

interface DeleteResponse {
  deleteTable: boolean;
}

interface IdInput {
  id: String;
}

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

  const { loading, error, data } = useQuery<TableData>(GET_TABLE);
  const [addTable] = useMutation<AddResponse, Input>(ADD_TABLE);
  const [updateTable] = useMutation<UpdateResponse, Input>(UPDATE_TABLE);
  const [deleteTable] = useMutation<DeleteResponse, IdInput>(DELETE_TABLE);

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR</p>;
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
                addTable({ variables: { tableNumber: (newData.tableNumber as number) , minCapacity: 1, maxCapacity: 4, description: newData.description } });
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
                updateTable({ variables: { tableNumber: newData.tableNumber, minCapacity: newData.minCapacity, maxCapacity: newData.maxCapacity, description: newData.description } });
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
                deleteTable({ variables: { id: oldData.id } });
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