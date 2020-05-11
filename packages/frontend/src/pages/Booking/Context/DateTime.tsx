import * as React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


interface DateConstructor {
  startDate: Date;
}

class DateTime extends React.Component<{}, DateConstructor> {

  constructor(props: DateConstructor) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(date: Date) {
    //console.log('date is here!', date);
    this.setState({
      startDate: date
    });
  }

  render() {
    const { startDate } = this.state;
    return (
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
    )
  }
}

export default DateTime;