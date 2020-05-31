import { createContext } from 'react';

export enum Category {
  ENTREE = "ENTREE",
  SALAD = "SALAD",
  MAIN = "MAIN",
  DESSERT = "DESSERT",
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

export interface Table {
  id: string;
  tableNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

export enum CurrentProgress {
  SELECT_DETAILS,
  SELECT_TABLE,
  SELECT_ITEMS,
  CONFIRM,
}

export interface BookingDetails {
  numberOfPeople?: number;
  location?: string;
  selectedDate?: Date;
  selectedTable?: Table;
  selectedItems?: Array<Item>;
}

export interface BookingContextProps {
  currentProgress: CurrentProgress;
  bookingDetails: BookingDetails;
  setCurrentProgress: (_: CurrentProgress) => void;
  setBookingDetails: (_: BookingDetails) => void;
}

const BookingContext = createContext<BookingContextProps>({
  currentProgress: CurrentProgress.SELECT_DETAILS,
  bookingDetails: {},
  setCurrentProgress: (_: CurrentProgress) => {},
  setBookingDetails: (_: BookingDetails) => {},
});

export default BookingContext;
