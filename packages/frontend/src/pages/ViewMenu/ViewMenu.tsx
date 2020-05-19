import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './ViewMenu.css';
import NavBar from 'components/NavBar';

type Category = "ENTREE" | "MAIN" | "DESSERT";

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
  query getItem {
    allItems {
      name
      description
      price
      category
    }
  }
`;

interface ListProps<T> {
  queryResult: QueryResult<T>;
  filter: Category;
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

const ItemList = ({ queryResult: { loading, error, data }, filter } : ListProps<ItemsData>) => {
  const status = (fitler: Category) => {
    if (loading) {
      return (
        <p>Loading...</p>
      );
    } else {
      if (error) {
        return (
          <p>An error occurred: {error.message}</p>
        );
      } else if (!data) {
        return (
          <p>(NO DATA)</p>
        );
      } else {
        return (
          <div>
            {
              data.allItems
                .filter(item => {
                  console.log(`${item.category}`);
                  return item.category === filter;
                })
                .map((item, index) => <ItemListRow key={index} item={item} />)
            }
          </div>
        );
      }
    }
  }

  return (
    <div>
      {status(filter)}
    </div>
  )
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
            <ItemList queryResult={query} filter={"ENTREE"} />
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Mains</Typography>
            <ItemList queryResult={query} filter={"MAIN"} />
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Desserts & Drinks</Typography>
            <ItemList queryResult={query} filter={"DESSERT"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
