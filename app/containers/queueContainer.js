import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Queue } from '../components';
import { clearQueue, removeSongFromQueue } from '../actions/queue';
import { toggleQueue } from '../actions/ui';
import { fetchSongOnly } from '../actions/song';

class QueueContainer extends Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    //console.log(this.props);
    return <Queue {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    songs: state.queueState.queue,
    songData: state.songData
  };
}

export default connect(mapStateToProps,
{ toggleQueue, clearQueue, removeSongFromQueue, fetchSongOnly })(QueueContainer);
