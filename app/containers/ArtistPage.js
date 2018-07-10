import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtist, clearArtist, changePageChunkIndex } from '../actions/artist';
import { replaceQueue } from '../actions/queue';
import { fetchSong, fetchSuggestedSongs } from '../actions/song';
import { Pages } from '../components';
import { translate } from 'react-i18next';

class ArtistPage extends Component {
  componentDidMount() {
    const { artistName } = this.props; // check if there is already artist data or not
    if (!artistName || this.props.artistName !== this.props.params.name) {
      // clear the previous artist data
      if (this.props.artistName) {
        this.props.clearArtist();
      }
      this.props.fetchArtist(this.props.params.name);
      this.props.fetchArtist(this.props.params.name, 'biography');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.name !== this.props.params.name) {
      this.props.clearArtist();
      this.props.fetchArtist(nextProps.params.name);
      this.props.fetchArtist(nextProps.params.name, 'biography');
    }
    
    const nextPage = nextProps.location.query.page;
    const currPage = this.props.location.query.page;

    if (nextPage && nextPage !== currPage) {
      this.props.fetchArtist(this.props.params.name, 'songs', nextPage);
    }
  }

  render() {
    return (
      <div>
        <Pages.ArtistPage {...this.props} activePage={this.props.location.query.page}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cover, description, dateOfBirth,
    avatar,
    artistName,
    song: { songs, numberOfPages } } = state.artistState.artist;

  const { pageChunkIndex, pageChunks, suggestedArtists } = state.artistState;

  return {
    cover,
    avatar,
    songs,
    numberOfPages,
    artistName,
    pageChunks,
    pageChunkIndex,
    queueIds: state.queueState.ids,
    suggestedArtists, description, dateOfBirth
  };
}

export default translate('album')(connect(mapStateToProps,
  { fetchArtist,
    clearArtist,
    changePageChunkIndex,
    replaceQueue,
    fetchSong,
    fetchSuggestedSongs,
  })(ArtistPage));
