import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, AppBar, Toolbar, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, Container, Grid, Paper } from '@material-ui/core';
import TableChartIcon from '@material-ui/icons/TableChart';
import PeopleIcon from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';

import AuthContext from 'context/authContext';
import NavbarContext from 'context/navbarContext';

import Staff from './StaffList';
import Customer from './CustomerList';
import Table from './TableList';
import Order from './OrderList';
import Item from './ItemList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Admin() {
  const navbarContext = useContext(NavbarContext);
  const authContext = useContext(AuthContext);
  navbarContext.setShouldShowNavbar(false);

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const showStaff = () => {
    setShow('staff');
  };

  const showCustomer = () => {
    setShow('customer');
  };

  const showTable = () => {
    setShow('table');
  };

  const showOrder = () => {
    setShow('order');
  };

  const showItem = () => {
    setShow('item');
  };

  let content = null;

  switch (show) {
    case 'staff':
      content = <Staff />;
      break;

    case 'customer':
      content = <Customer />;
      break;

    case 'table':
      content = <Table />;
      break;

    case 'order':
      content = <Order />;
      break;

    case 'item':
      content = <Item />;
      break;

    default:
      content = <Typography>Welcome to the Dashboard</Typography>;
  }

  if (!authContext.user.isAdmin) {
    navbarContext.setShouldShowNavbar(true);
    return <Redirect to="/"/>;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div>
          <ListItem button onClick={showCustomer}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          <ListItem button onClick={showStaff}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Staffs" />
          </ListItem>

          <ListItem button onClick={showTable}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItem>

          <ListItem button onClick={showOrder}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem button onClick={showItem}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItem>
        </div>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/*Content Lists */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {content}
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
    </div>
  );
}
