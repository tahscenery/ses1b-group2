import React, { useContext, useState } from 'react';
import { Avatar, Button, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, ListItemAvatar } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ItemList from 'components/ItemList';
import BookingContext, { CurrentProgress } from 'context/bookingContext';

enum Category {
  ENTREE = "ENTREE",
  SALAD = "SALAD",
  MAIN = "MAIN",
  DESSERT = "DESSERT",
}

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

interface ItemsData {
  allItems: Item[];
}

const GET_ITEMS = gql`
  query getItems {
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

// interface ItemListRowsProps {
//   results: ItemsData;
//   selectedIndex: number;
// }

// const ItemListRows: React. = ({ results, selectedIndex }: ItemListRowsProps) => {
//   return (
//     results.allItems
//       .filter(item => item.category === Category.ENTREE || item.category === Category.SALAD)
//       .map((item, index) => (
//         <>
//           <ListItem
//             button
//             key={`ListItem#${index}`}
//             selected={selectedIndex === index}
//           >
//             <ListItemText
//               key={`ListItemText#${index}`}
//               primary={`${item.name} - $${item.price}.00`}
//               secondary={item.description}/>
//             <ListItemIcon>
//               <Checkbox checked={selectedIndex === index} />
//             </ListItemIcon>
//           </ListItem>
//           <Divider />
//         </>
//       ))
//   );
// }

const SelectItems = () => {
  const context = useContext(BookingContext);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<null>(null);

  const queryResult = useQuery<ItemsData>(GET_ITEMS);

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_TABLE);
  }

  const handleNext = () => {
    // context.setBookingDetails({ selectedItems });
    context.setCurrentProgress(CurrentProgress.SELECT_DETAILS);
  }

  const handleToggle = (index: number, item: Item) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      // if (selectedItems.delete(item.id)) {
      //   console.log(`Successfully removed ${item.id}`);
      // }
    } else {
      setSelectedIndex(index);
      // if (selectedItems.set(item.id, )) {}
    }
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Choose from the menu</Typography>
      <p>Almost done! Select from a range of entrées, salads, mains, and
        desserts from our menu.</p>
      <Typography variant="h3">Entrées and Salads</Typography>
      <List>
        <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
          {results => results.allItems
            .filter(item => item.category === Category.ENTREE || item.category === Category.SALAD)
            .map((item, index) => (
              <>
                <ListItem
                  button
                  key={`ListItem#${index}`}
                  selected={selectedIndex === index}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.description} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    key={`ListItemText#${index}`}
                    primary={`${item.name} - $${item.price}.00`}
                    secondary={item.description}/>
                  <ListItemIcon>
                    <Checkbox checked={selectedIndex === index} />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </>
            ))}
        </ItemList>
      </List>
      <Typography variant="h3">Mains</Typography>
      <List>
        <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
          {results => results.allItems
            .filter(item => item.category === Category.MAIN)
            .map((item, index) => (
              <>
                <ListItem
                  button
                  key={`ListItem#${index}`}
                  selected={selectedIndex === index}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.description} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    key={`ListItemText#${index}`}
                    primary={`${item.name} - $${item.price}.00`}
                    secondary={item.description}/>
                  <ListItemIcon>
                    <Checkbox checked={selectedIndex === index} />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </>
            ))}
        </ItemList>
      </List>
      <Typography variant="h3">Desserts</Typography>
      <List>
        <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
          {results => results.allItems
            .filter(item => item.category === Category.DESSERT)
            .map((item, index) => (
              <>
                <ListItem
                  button
                  key={`ListItem#${index}`}
                  selected={selectedIndex === index}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.description} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    key={`ListItemText#${index}`}
                    primary={`${item.name} - $${item.price}.00`}
                    secondary={item.description}/>
                  <ListItemIcon>
                    <Checkbox checked={selectedIndex === index} />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </>
            ))}
        </ItemList>
      </List>
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
          onClick={handleNext}
          size="large"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectItems;
