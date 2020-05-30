import React, { useContext, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './SelectTable.css';
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

interface TableRowItemProps {
  item: Table;
}

const TableListRow = ({ item: table }: TableRowItemProps) => {
  return (
    <div className="table-list-row">
      {/* <div className="table-list-row-header">
        <Typography variant="h3">Table {table.tableNumber}</Typography>
        <Button color="secondary" variant="outlined">Select</Button>
      </div>
      <p>{table.minCapacity} to {table.maxCapacity} people</p> */}
      <div className="table-list-row-contents">
        <label htmlFor={table.id}>
          <div>
            <Typography variant="h3">Table {table.tableNumber}</Typography>
            <p>{table.minCapacity} to {table.maxCapacity} people</p>
          </div>
          <input type="radio" name="table" id={table.id} />
        </label>
      </div>
    </div>
  )
}

const SelectTable = () => {
  const context = useContext(BookingContext);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const queryResult = useQuery<TablesData>(GET_TABLES);

  const handlePrevious = () => {
    context.setCurrentProgress(CurrentProgress.SELECT_DETAILS);
  }

  const handleNext = () => {
    context.setBookingDetails({ selectedTable });
    context.setCurrentProgress(CurrentProgress.SELECT_ITEMS);
  }

  return (
    <div className="booking-form-container">
      <Typography variant="h2">Select Table</Typography>
      <div>
        <form noValidate onSubmit={_ => {}}>
          <ItemList queryResult={queryResult} numberOfLoadingCards={4}>
            {results => results.allTables
              .filter(table =>
                table.minCapacity <= context.bookingDetails.numberOfPeople
                && table.maxCapacity >= context.bookingDetails.numberOfPeople)
              .map((item, index) => (
                <TableListRow key={index} item={item}/>
              ))}
          </ItemList>
        </form>
      </div>
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

export default SelectTable;
