import React, { useState, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { MyTable } from './Table'
// import { Query } from 'react-apollo';
// import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
// import ReactTable from 'react-table'

interface Row {
  id: string;
  number: number;
  minCapacity: number;
  maxCapacity: number;
}

interface TableData {
  allTables: Row[];
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}



export default function TableList() {

  const [state, setState] = React.useState<TableState>({
    columns:
      [
        { title: 'Id', field: 'id', type: 'numeric' },
        { title: 'Table Number', field: 'number' },
        { title: 'Min Capacity', field: 'minCapacity' },
        { title: 'Max Capacity', field: 'maxCapacity' }
      ],
    datas:
      [
      ]
  });



  return (
    <div>
      <MaterialTable
        title="Table List"
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