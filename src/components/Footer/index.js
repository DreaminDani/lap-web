import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SoundCloudPlayer from '../SoundCloudPlayer';

const clientId = 'd12b27d31940177e8a60a1ba4b4084dd';
const resolveUrl = 'https://soundcloud.com/user-463522191/perspective';

const useStyles = makeStyles(theme => ({
  player: {
    float: 'right',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}))

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <SoundCloudPlayer
        className={classes.player}
        clientId={clientId}
        resolveUrl={resolveUrl}
      />
    </footer>
  )
}

export default Footer;
