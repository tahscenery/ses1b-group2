import React, { Component, useState, Fragment } from 'react';
import MaterialTable, { Column } from 'material-table';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
import ReactTable from 'react-table';
import { MyTable } from "./Table";


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

const GET_STAFF = gql`
query {
  returnAllStaffs{
    id
    username
    email
    password
  }
}`;

const ADD_STAFF = gql`
mutation($username: String, $email: String, $password: password){
  createStaff (username: $username, email: $email, password: $password) {
    username
    email
    password
  }
}`;

const DELETE_STAFF = gql`
mutation($id: String){
  deleteStaff (id: $id)
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
        { id: "", username: "", email: "", password: "" },
      ]
    }
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    //const { loading, error, data } = useQuery(GET_STAFF);

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
