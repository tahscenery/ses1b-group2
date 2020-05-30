import React from 'react';
import { QueryResult } from '@apollo/react-common';

import LoadingCard from './LoadingCard';

interface ItemListProps<T> {
  queryResult: QueryResult<T>;
  numberOfLoadingCards: number;
  children: (results: T) => Array<JSX.Element>;
}

function ItemList<T>({ queryResult, numberOfLoadingCards, children }: ItemListProps<T>) {
  const { loading, error, data } = queryResult;

  if (loading) { return <LoadingCard numberOfItems={numberOfLoadingCards} />; }
  if (error) { return <p>(ERROR) {error.message}</p>; }
  if (!data) { return <p>(NO DATA)</p>; }

  console.log(data);
  return (
    <>
      {children(data)}
    </>
  );
}

export default ItemList;
