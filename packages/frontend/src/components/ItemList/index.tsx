import React from 'react';
import { QueryResult } from '@apollo/react-common';

import Alert from 'components/Alert';
import LoadingCard from './LoadingCard';

interface ItemListProps<T> {
  queryResult: QueryResult<T>;
  numberOfLoadingCards: number;
  children: (results: T) => Array<JSX.Element>;
}

function ItemList<T>({ queryResult, numberOfLoadingCards, children }: ItemListProps<T>) {
  const { loading, error, data } = queryResult;

  if (loading) { return <LoadingCard numberOfItems={numberOfLoadingCards} />; }
  if (error) { return <Alert severity="error">{error.message}</Alert>; }
  if (!data) { return <Alert severity="info">No data found</Alert> }

  return (<>{children(data)}</>);
}

export default ItemList;
