import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function Customer() {

  const [state, setState] = React.useState<TableState>({
    columns: 
    [
      { title: 'Id', field: 'id', type: 'numeric'},
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Password', field: 'password'} 
    ],
    data: 
    [
      { id: 1, name: 'Bryan', email: "bryan@yahoo.com", password: "123"},
      { id: 2, name: 'Colin', email: "colin@yahoo.com", password: "123"}
    ] 
  });

  return (
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
  );
}