import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Queue } from '../components';
import { clearQueue, removeSongFromQueue } from '../actions/queue';
import { toggleQueue } from '../actions/ui';
import { fetchSong } from '../actions/song';
import { translate } from 'react-i18next'; 

class QueueContainer extends Component {

  render() {
    return <Queue {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    songs: state.queueState.queue,
    songData: state.songData
  };
}

export default translate('player')(connect(mapStateToProps,
{ toggleQueue, clearQueue, removeSongFromQueue, fetchSong })(QueueContainer));
