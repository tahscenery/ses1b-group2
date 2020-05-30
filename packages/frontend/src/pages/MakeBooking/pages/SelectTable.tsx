import React, { useContext, useState } from 'react';
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Radio } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ItemList from 'components/ItemList';
import BookingContext, { CurrentProgress } from 'context/bookingContext';

interface Table {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

interface TablesData {
  allTables: Table[];
}

const GET_TABLES = gql`
  query getTables {
    allTables {
      id
      tableNumber
      minCapacity
      maxCapacity
      description
    }
  }
`;

const SelectTable = () => {
  const context = useContext(BookingContext);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const queryResult = useQuery<TablesData>(GET_TABLES);

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_DETAILS);
  }

  const handleNext = () => {
    context.setBookingDetails({ selectedTable });
    context.setCurrentProgress(CurrentProgress.SELECT_ITEMS);
  }

  const handleToggle = (index: number, table: Table) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setSelectedTable(null);
    } else {
      setSelectedIndex(index);
      setSelectedTable(table.id);
    }
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Select a table</Typography>
      <p>Now select a table from the list below.</p>
      <List>
        <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
          {results => results.allTables
            .filter(table =>
              table.minCapacity <= context.bookingDetails.numberOfPeople
              && table.maxCapacity >= context.bookingDetails.numberOfPeople)
            .map((table, index) => (
              <>
                <ListItem
                  button
                  key={`ListItem#${index}`}
                  selected={selectedIndex === index}
                  onClick={_ => handleToggle(index, table)}>
                  <ListItemText
                    key={`ListItemText#${index}`}
                    primary={`Table ${table.tableNumber}`}
                    secondary={`Suitable for ${table.minCapacity} to ${table.maxCapacity} people`}/>
                  <ListItemIcon>
                    <Radio checked={selectedIndex === index} />
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
          disabled={selectedTable === null || selectedTable === undefined}
          onClick={handleNext}
          size="large"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectTable;
