import React from 'react';
import PropTypes from 'prop-types';
import { withSoundCloudAudio } from 'react-soundplayer/addons';
import { Fab } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const SoundCloudPlayer = withSoundCloudAudio(props => {
  const { soundCloudAudio, playing, className } = props;
    const play = () => {
      if (playing) {
        soundCloudAudio.pause();
      } else {
        soundCloudAudio.play();
      }
    };

    return (
      <Fab className={className} color="primary" onClick={play}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </Fab>
    );
});

SoundCloudPlayer.propTypes = {
  resolveUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired
};

export default SoundCloudPlayer;