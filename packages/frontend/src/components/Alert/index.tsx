import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  alert: {
    margin: "10px 0",
  }
})

const Alert = (props: AlertProps) => {
  const styles = useStyles();

  return (
    <MuiAlert
     className={styles.alert}
     elevation={2}
     variant="standard" {...props} />
  );
}

export default Alert;
