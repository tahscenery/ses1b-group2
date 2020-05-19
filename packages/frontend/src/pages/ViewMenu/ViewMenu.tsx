import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import gql from 'graphql-tag';

import './ViewMenu.css';
import NavBar from 'components/NavBar';

interface Item {
  name: string;
  description: string;
  price: number;
  category: "entree" | "main" | "dessert";
}

interface ItemsData {
  items: Item[];
}

const GET_ITEMS = gql`
  query getItem {
    items {
      name
      description
      price
      category
    }
  }
`;

const ViewMenu = () => {
  useEffect(() => {
    document.title = 'Menu – Sapori Unici';
  });

  const { loading, error, data } = useQuery<ItemsData>(GET_ITEMS);

  if (loading) {
    console.log("Loading...");
  } else {
    if (error) {
      console.log(`An error occurred: ${error.message}`);
    } else if (!data) {
      console.log("No data...");
    } else {
      data.items.forEach(item => {
        console.log({ name: item.name, description: item.description, price: `$${item.price}` })
      });
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="view-menu-container">
        <div className="view-menu">
          <div className="view-menu-collection">
            <Typography variant="h2">Entrée & Salads</Typography>
            {/* {menu
              .filter(item => item.type === 'entree')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)} */}
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Mains</Typography>
            {/* {menu
              .filter(item => item.type === 'main')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)} */}
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Desserts & Drinks</Typography>
            {/* {menu
              .filter(item => item.type === 'dessert')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
