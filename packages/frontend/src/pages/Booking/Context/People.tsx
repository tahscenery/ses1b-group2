import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function People() {
  const classes = useStyles();
  const [number, setNumber] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNumber(event.target.value as string);
  };

  return (
    <div>
      <Typography variant="h6" color="secondary">
         Number of People
        </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="number">Number</InputLabel>
        <Select
          labelId="number"
          id="number"
          value={number}
          onChange={handleChange}
          label="Number of People">
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}