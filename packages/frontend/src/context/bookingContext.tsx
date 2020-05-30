import { createContext } from 'react';

export enum CurrentProgress {
  SELECT_DETAILS,
  SELECT_TABLE,
  SELECT_ITEMS,
}

export interface BookingDetails {
  numberOfPeople?: number;
  location?: string;
  selectedDate?: Date;
  selectedTable?: string;
  selectedItems?: Array<string>;
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
