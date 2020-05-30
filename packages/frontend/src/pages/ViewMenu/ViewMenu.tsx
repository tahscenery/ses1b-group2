import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './ViewMenu.css';
import ItemList from 'components/ItemList';

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

const ViewMenu = () => {
  useEffect(() => {
    document.title = 'Menu – Sapori Unici';
  });

  const query = useQuery<ItemsData>(GET_ITEMS);

  return (
    <div>
      <div className="view-menu-container">
        <div className="view-menu">
          <div className="view-menu-collection">
            <Typography variant="h2">Entrée & Salads</Typography>
            <ItemList queryResult={query} numberOfLoadingCards={4}>
              {results => results.allItems
                .filter(item => item.category === Category.ENTREE || item.category === Category.SALAD)
                .map((item, index) => (
                  <ItemListRow key={`ItemListRow#${index}`} item={item} />
                ))}
            </ItemList>
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Mains</Typography>
            <ItemList queryResult={query} numberOfLoadingCards={4}>
              {results => results.allItems
                .filter(item => item.category === Category.MAIN)
                .map((item, index) => (
                  <ItemListRow key={`ItemListRow#${index}`} item={item} />
                ))}
            </ItemList>
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Desserts & Drinks</Typography>
            <ItemList queryResult={query} numberOfLoadingCards={4}>
              {results => results.allItems
                .filter(item => item.category === Category.DESSERT)
                .map((item, index) => (
                  <ItemListRow key={`ItemListRow#${index}`} item={item} />
                ))}
            </ItemList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
