import React, { useContext, useState } from 'react';
import { Avatar, Button, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, ListItemAvatar, ListSubheader } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './SelectItems.css';
import Alert from 'components/Alert';
import BookingContext, { Category, CurrentProgress, Item } from 'context/bookingContext';

const nameForCategory = (category: Category) => {
  switch (category) {
    case Category.ENTREE:   return "Entrées"
    case Category.SALAD:    return "Salads"
    case Category.MAIN:     return "Mains"
    case Category.DESSERT:  return "Desserts"
    default:                return `Category ${category}`
  }
}

interface ItemsData {
  allItems: Item[];
}

const GET_ITEMS = gql`
  query getItemsSelectItems {
    allItems {
      id
      name
      description
      price
      category
      image
    }
  }
`;

const SelectItems = () => {
  const context = useContext(BookingContext);
  const { loading, error, data } = useQuery<ItemsData>(GET_ITEMS);

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleToggle = (item: Item) => {
    const currentItemIndex = selectedItems.indexOf(item);
    const newSelectedItems = [...selectedItems];

    if (currentItemIndex === -1) {
      newSelectedItems.push(item);
      setTotalPrice(totalPrice + item.price);
    } else {
      newSelectedItems.splice(currentItemIndex, 1);
      setTotalPrice(totalPrice - item.price);
    }

    setSelectedItems(newSelectedItems);
  }

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_TABLE);
  }

  const handleNext = () => {
    context.setBookingDetails({ selectedItems, totalPrice });
    context.setCurrentProgress(CurrentProgress.CONFIRM);
  }

  if (loading) { return <Alert severity="info">Loading...</Alert> }
  if (error) { return <Alert severity="error">{error.message}</Alert> }
  if (!data) { return <Alert severity="info">No data found</Alert> }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Choose from the menu</Typography>
      <p>Almost done! Select from a range of entrées, salads, mains, and
          desserts from our menu.</p>
      <List className="list" subheader={<li/>}>
        {[Category.ENTREE, Category.SALAD, Category.MAIN, Category.DESSERT]
          .map((category, categoryIndex) => (
            <li className="list-category" key={`list-category-${categoryIndex}`}>
              <ul>
                <ListSubheader className="list-category-subheader">
                  <Typography variant="h3">
                    {nameForCategory(category)}
                  </Typography>
                </ListSubheader>
                {data.allItems
                  .filter(item => item.category === category)
                  // .sort((a, b) => a.price < b.price ? -1 : a.price > b.price ? 1 : 0)
                  .map(item => (
                    <>
                      <ListItem
                        button
                        key={`list-item-${item.id}`}
                        selected={selectedItems.includes(item)}
                        onClick={_ => handleToggle(item)}
                      >
                        <ListItemAvatar>
                            <Avatar src={item.image} />
                          </ListItemAvatar>
                          <ListItemText
                            key={`list-item-text-${item.id}`}
                            primary={`${item.name} - $${item.price.toFixed(2)}`}
                            secondary={item.description}/>
                          <ListItemIcon>
                            <Checkbox
                              checked={selectedItems.includes(item)} />
                          </ListItemIcon>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
              </ul>
            </li>
          ))}
      </List>
      <div className="booking-select-items-footer">
        <p>Total: ${`${totalPrice.toFixed(2)}`}</p>
        <div className="booking-footer">
          <Button
            color="secondary"
            onClick={handlePrevious}
            size="large"
          >
            Previous
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={totalPrice === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SelectItems;
