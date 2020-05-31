import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={2} variant="standard" {...props} />
}

export default Alert;
