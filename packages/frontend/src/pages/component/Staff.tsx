import React, { Component } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';


interface Row {
  username: string;
  email: string;
  password: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  datas: Row[];
}

const GET_DATA = gql`
query{
  returnAllStaffs{
    username
    email
    password
  }
}`;



class Staff extends React.Component<{}, TableState> {

  constructor(props: TableState) {
    super(props);
    this.state = {
      columns: [
        { title: 'Username', field: 'username' },
        { title: 'Email', field: 'email' },
        { title: 'Password', field: 'password' },
      ],
      datas: [
        { username: "", email: "", password: "" },
      ]
    }
  }

  componentDidMount() {
    //this.fetchData();
  }


  fetchData() {
    //const { loading, error, data } = useQuery(GET_DATA);
    //this.setState({ datas: [ ...this.state.datas, data] })
  }

  render() {
    return (
      
        <MaterialTable
          title="Staff List"
          columns={this.state.columns}
          data={this.state.datas}
          
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
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
                    this.setState((prevState) => {
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
                  this.setState((prevState) => {
                    const data = [...prevState.datas];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
    );
  }
}

export default Staff;