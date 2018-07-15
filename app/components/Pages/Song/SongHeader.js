import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { isAuthenticated } from '../../../HOC';
import { changeAlias } from '../../../utils/func';
import LinksByComma from '../../LinksByComma';
import HeaderShare from './HeaderShare';

class SongHeader extends React.Component {
  state = {
    showShare: false
  }

  toggleShare = (status) => {
    this.setState({showShare : status})
  }
  render() {
    const {
      songData,
      download,
      downloadProgress,
      authenticated,
      redirectTo,
      user, t
    } = this.props;
    const shareUrl = songData.name ? `${window.location.host}/song/${changeAlias(songData.name)}/${songData.id}` : '';
    // const artists = songData.artists_names && songData.artists_names.split(/\s*,\s*/);
    return (
      <div className="song-header">
        {/* <div className="song-header-img">
        </div> */}
        <div className="song-header-info">
          <div className="song-header-song-title">
            {songData.name}
          </div>
          <div className="song-header-song-artist">
            {/* <Link
              to={`/artist/${artists && changeAlias(artists[0])}`}
              className='ellipsis'
              title={songData.artists_names}
            >{songData.artists_names}
            </Link> */}
            <LinksByComma
              data={songData.artists || []}
              titleEntry="name"
              pathEntry="link"
              definePath={(link) => link.replace('/nghe-si/', '/artist/')}
              defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
            />
          </div>
        </div>
        <div className="song-header-actions">
          <button className="sc-ir"
            title={t('download')}
            onClick={() => {
              if (!(authenticated && user.username)) {
                // remove the dropdown from the interface
                return redirectTo('/login');
              }
              download({
                songName: changeAlias(songData.name),
                id: songData.id
              })
            }}><i className="ion-ios-download-outline"></i>
          </button>
          <button className="sc-ir"
            title={t('addToPlayList')}
            onClick={() => {
              if (!(authenticated && user.username)) {
                // remove the dropdown from the interface
                return redirectTo('/login');
              }

              this.props.addSongToStoreTemporarily({
                name: songData.name,
                artists: songData.artists,
                id: songData.id,
                thumbnail: songData.thumbnail || 'http://zmp3-photo-td.zadn.vn/noimage',
              });
              this.props.toggleModal();
            }}
          ><i className="ion-ios-plus-empty"></i>
          </button>
          <button className="sc-ir ignore-react-onclickoutside"
            title={t('share')}
            onClick={() => {
              this.toggleShare(!this.state.showShare)
            }}
          ><i className="ion-android-share-alt"></i>
          </button>

        </div>
        {(typeof downloadProgress[songData.id] !== 'undefined' && downloadProgress[songData.id] != -1) &&
          <span>{`${t('processDownload')}... ${downloadProgress[songData.id]}%`}</span>}
          <HeaderShare t={t} name={songData.name} shareUrl={shareUrl} showShare={this.state.showShare}
            toggleShare={this.toggleShare}/>
      </div>
    );
  };
}

SongHeader.propTypes = {
  songData: PropTypes.object.isRequired,
  download: PropTypes.func.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  addSongToStoreTemporarily: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default isAuthenticated(SongHeader);
