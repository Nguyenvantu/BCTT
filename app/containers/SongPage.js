import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Karaoke as KarokeContainer } from './';
import { Pages } from '../components';
import { fetchSong, fetchSuggestedSongs, download } from '../actions/song';
import { addSongToStoreTemporarily } from '../actions/user_playlist';
import { showAnalyzer, toggleModal } from '../actions/ui';
import { addSongToQueue } from '../actions/queue';
import { getSongUrl, isEmpty } from '../utils/func';
import { translate } from 'react-i18next';

class SongPage extends React.Component {
  componentDidMount() {
    this.props.showAnalyzer();

    const { name, id } = this.props.params;
    // only fetch new song data when the user enter the url directly into the url bar on the browser
    // or the url params.id is different from the playing song id

    if (isEmpty(this.props.songData) || id !== this.props.songData.id) {
      this.props.fetchSong(name, id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { routing: { locationBeforeTransitions: currLoc } } = this.props;
    const { routing: { locationBeforeTransitions: nextLoc } } = nextProps;
    const { id: nextId, name } = nextProps.songData;

    if (nextProps.params.id === nextId) {
      return;
    }

    if (!!nextId && nextId !== this.props.songData.id) {
      browserHistory.push(getSongUrl(name, nextId));
      return;
    }

    if (((!currLoc && nextLoc) ||
      (currLoc && nextLoc && currLoc.pathname !== nextLoc.pathname)) &&
      /song\/.+/.test(nextLoc.pathname)) {
      // if (this.props.params.id !== nextId) {
      //   return;
      // }

      const { name, id } = nextProps.params;
      this.props.fetchSong(name, id);
    }
  }

  render() {
    const { songTemp, download, downloadProgress, toggleModal, addSongToStoreTemporarily, t, suggestedSongs, fetchSong,
      addSongToQueue, params } = this.props;
    const songTempData = songTemp[params.id] ? songTemp[params.id] : Object.create(null);

    return (
      <div>
        <Pages.SongHeader
          songData={songTempData}
          download={download}
          downloadProgress={downloadProgress}
          toggleModal={toggleModal}
          addSongToStoreTemporarily={addSongToStoreTemporarily}
          t={t}
        />
        <KarokeContainer className='karaoke-song-page'/>
        <Pages.SongPageBody suggestedSongs={suggestedSongs} fetchSong={fetchSong}
          addSongToQueue={addSongToQueue} t={t} songData={songTempData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestedSongs: state.songData.suggestedSongs,
    songData: state.songData.data,
    songTemp: state.songData.tempData,
    downloadProgress: state.UIState.downloadProgress,
    routing: state.routing,
    // canPushRoute: state.queueState.pushRoute,
  };
}

export default translate('player')(connect(mapStateToProps,
  {
    fetchSong,
    showAnalyzer,
    fetchSuggestedSongs,
    download,
    addSongToStoreTemporarily,
    addSongToQueue,
    toggleModal,
  })(SongPage));

