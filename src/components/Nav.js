import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavigationIcon from '@material-ui/icons/Navigation';
import { navigate } from "gatsby"

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(3,2),
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Nav() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(destination) {
    if (typeof destination === 'string') {
      if (destination.startsWith('/')) {
        navigate(destination);
      } else {
        window.open(destination, '_blank');
      }
    }
    setAnchorEl(null);
  }

  return (
    <div>
      <Fab
          variant="extended"
          aria-controls="simple-menu"
          aria-haspopup="true"
          aria-label="Navigation"
          className={classes.fab}
          onClick={handleClick}
        >
        <NavigationIcon className={classes.extendedIcon} />
        Menu
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleClose('/about')}>Band Members</MenuItem>
        <MenuItem onClick={() => handleClose('/blog')}>Blog</MenuItem>
        <MenuItem onClick={() => handleClose('https://www.facebook.com/lifeafterparties')}>Facebook</MenuItem>
        <MenuItem onClick={() => handleClose('https://soundcloud.com/user-463522191')}>Soundcloud</MenuItem>
      </Menu>
    </div>
  );
}