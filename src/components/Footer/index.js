import React from 'react';
import './footer.scss';
import { Box } from '@material-ui/core';

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <Box boxShadow={8}>
          <iframe title="soundcloud player" width="100%" height="150" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/444594507&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        </Box>
      </footer>
    )
  }
}

export default Footer;
