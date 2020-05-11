import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import './Styles.css'

interface LocationConstructor {
  location: String;
  setLocation: String;
}

class Location extends React.Component<{}, LocationConstructor> {

  constructor(props: LocationConstructor) {
    super(props);
    this.state = {
      location: "",
      setLocation: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    this.setState({ location: (event.target.value as string) });
  }

  render() {
    return (
      <div>
        <Typography variant="h6" color="secondary">
          Location
        </Typography>
        <FormControl variant="outlined" style={{minWidth: 160, margin: 'dense'}}>
          <InputLabel id="location">Location</InputLabel>
          <Select
            labelId="location"
            id="location"
            value={this.state.location}
            onChange={this.handleChange}
            label="location"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={1}>A</MenuItem>
            <MenuItem value={2}>B</MenuItem>
            <MenuItem value={3}>C</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}



export default Location;