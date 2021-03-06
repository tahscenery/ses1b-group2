import React, { useContext, useState } from 'react';
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, Radio } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ItemList from 'components/ItemList';
import BookingContext, { CurrentProgress, Table } from 'context/bookingContext';

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
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

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
      setSelectedTable(table);
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
                  key={`list-item-${index}`}
                  selected={selectedIndex === index}
                  onClick={_ => handleToggle(index, table)}>
                  <ListItemText
                    key={`list-item-text-${index}`}
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
          size="large"
          onClick={handleNext}
          disabled={selectedTable === null || selectedTable === undefined}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectTable;
