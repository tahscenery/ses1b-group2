import React, { Component } from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
} from '@material-ui/core';

import { QueryResult } from '@apollo/react-common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

interface Props {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

interface TableData {
  allTables: Props[];
}

interface TableListRowProps {
  table: Props;
}

const TableListRow = (props: TableListRowProps) => {

  const classes = useStyles();
  const theme = useTheme();

  const { tableNumber, minCapacity, maxCapacity, description } = props.table;
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container direction={'row'}>
          <div className={classes.controls}>
            <Grid item>
              <div className={classes.controls}>
                <Typography variant="h3">{description}</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.controls}>
                <Typography variant="h3">Min Capacity: {minCapacity}</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.controls}>
                <Typography variant="h3">Max Capacity: {maxCapacity}</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.controls}>
                <Button variant="contained" color="primary">Select</Button>
              </div>
            </Grid>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
}

interface TableListProps<T> {
  queryResult: QueryResult<T>;
}

const Table = ({ queryResult }: TableListProps<TableData>) => {
  const { loading, error, data } = queryResult;

  if (loading) { return <p>Loading</p>; }
  if (error) { return <p>(ERROR) {error.message}</p>; }
  if (!data) { return <p>(NO DATA)</p>; }

  return (
    <>
      {data.allTables
        .map((tables, index) => (
          <TableListRow key={`TableListRow#${index}`} table={tables} />
        ))}
    </>
  );
}

export default Table;