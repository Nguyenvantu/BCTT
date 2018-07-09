import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { isEmpty } from '../utils/func';
import { fetchAlbumPlaylist, clearPlaylist } from '../actions/album';
import { replaceQueue } from '../actions/queue';

class AlbumPlaylist extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.params;

    if (!isEmpty(this.props.playlist)) {
      // Clear the the previous playlist data in the store
      this.props.clearPlaylist();
    }

    this.props.fetchAlbumPlaylist(title, id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.clearPlaylist();
      this.props.fetchAlbumPlaylist(nextProps.params.title, nextProps.params.id);
    }
  }

  render() {
    return (
      <Pages.AlbumPlaylist
        playlist={this.props.playlist}
        replaceQueue={this.props.replaceQueue}
        isPlaying={this.props.isPlaying}
        suggestedAlbums={this.props.suggestedAlbums}
      />
    );
  }
}

function mapStateToProps(state) {
  const { playlist, suggestedAlbums } = state.albumState;
  const isPlaying = !isEmpty(state.songData.data);
  return { playlist, isPlaying, suggestedAlbums };
}

export default connect(mapStateToProps,
{ fetchAlbumPlaylist, clearPlaylist, replaceQueue })(AlbumPlaylist);
