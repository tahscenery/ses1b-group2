import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './ViewMenu.css';
import NavBar from 'components/NavBar';

enum Category {
  ENTREE = "ENTREE",
  SALAD = "SALAD",
  MAIN = "MAIN",
  DESSERT = "DESSERT",
}

interface Item {
  name: string;
  description: string;
  price: number;
  category: Category;
}

interface ItemsData {
  allItems: Item[];
}

const GET_ITEMS = gql`
  query getItems {
    allItems {
      name
      description
      price
      category
    }
  }
`;

const LoadingCard = () => {
  return (
    <>
      {[1, 2, 3, 4].map(i => (
        <div key={`view-menu-item#${i}`} className="view-menu-item">
          <div
            key={`view-menu-loading-element-heading#${i}`}
            className="view-menu-loading-element-heading gradient"></div>
          <div
            key={`view-menu-loading-element-body#${i}`}
            className="view-menu-loading-element-body gradient"></div>
        </div>
      ))}
    </>
  );
}

interface ItemListRowProps {
  item: Item;
}

const ItemListRow = (props: ItemListRowProps) => {
  const { name, price, description } = props.item;
  return (
    <div className="view-menu-item">
      <div className="view-menu-item-heading">
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h3">{price}</Typography>
      </div>
      <p>{description}</p>
    </div>
  );
}

interface ItemListProps<T> {
  queryResult: QueryResult<T>;
  filter: Category;
}

const ItemList = ({ queryResult, filter } : ItemListProps<ItemsData>) => {
  const { loading, error, data } = queryResult;

  if (loading) { return <LoadingCard />; }
  if (error) { return <p>An error occurred: {error.message}</p>; }
  if (!data) { return <p>(NO DATA)</p>; }

  return (
    <>
      {data.allItems
        .filter(item => item.category === filter)
        .map((item, index) => (
          <ItemListRow key={`ItemListRow#${index}`} item={item} />
        ))}
    </>
  );
}

const ViewMenu = () => {
  useEffect(() => {
    document.title = 'Menu – Sapori Unici';
  });

  const query = useQuery<ItemsData>(GET_ITEMS);

  return (
    <div>
      <NavBar/>
      <div className="view-menu-container">
        <div className="view-menu">
          <div className="view-menu-collection">
            <Typography variant="h2">Entrée & Salads</Typography>
            <ItemList queryResult={query} filter={Category.ENTREE} />
            <ItemList queryResult={query} filter={Category.SALAD} />
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Mains</Typography>
            <ItemList queryResult={query} filter={Category.MAIN} />
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Desserts & Drinks</Typography>
            <ItemList queryResult={query} filter={Category.DESSERT} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
