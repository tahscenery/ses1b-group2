import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import './ViewMenu.css';
import NavBar from 'components/NavBar';
import { menu, MenuItem } from 'resources/menu.json';

interface ItemProps {
  item: MenuItem;
}

const Item = (props: ItemProps) => {
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
    document.title = 'Menu – Sapori Unici';
  });

  return (
    <div>
      <NavBar/>
      <div className="view-menu-container">
        <div className="view-menu">
          <div className="view-menu-collection">
            <Typography variant="h2">Entrée & Salads</Typography>
            {menu
              .filter(item => item.type === 'entree')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)}
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Mains</Typography>
            {menu
              .filter(item => item.type === 'main')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)}
          </div>
          <div className="view-menu-collection">
            <Typography variant="h2">Desserts & Drinks</Typography>
            {menu
              .filter(item => item.type === 'dessert')
              .map((item, index) => <Item key={`Item#${index}`} item={item}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMenu;
