import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isAuthenticated } from '../../../HOC';
import { changeAlias } from '../../../utils/func';

const SongHeader = (props) => {
  const {
    songData,
    download,
    downloadProgress,
    authenticated,
    redirectTo,
    user, t
  } = props;
  const artists = songData.artists_names && songData.artists_names.split(/\s*,\s*/);

  return (
    <div className="song-header">
      {/* <div className="song-header-img">
      </div> */}
      <div className="song-header-info">
        <div className="song-header-song-title">
          {songData.name}
        </div>
        <div className="song-header-song-artist">
          <Link
            to={`/artist/${artists && changeAlias(artists[0])}`}
            className='ellipsis'
            title={songData.artists_names}
          >{songData.artists_names}
          </Link>
        </div>
      </div>
      <div className="song-header-actions">
        <button className="sc-ir"
          title={t('download')}
          onClick={() => download({
            songName: changeAlias(songData.name),
            id: songData.id,
          })}
        ><i className="ion-ios-download-outline"></i></button>
        <button className="sc-ir"
          title={t('addToPlayList')}
          onClick={() => {
            if (!(authenticated && user.username)) {
              // remove the dropdown from the interface
              return redirectTo('/login');
            }

            props.addSongToStoreTemporarily({
              name: songData.name,
              artists: songData.artist,
              id: songData.id,
              thumbnail: 'http://zmp3-photo-td.zadn.vn/noimage',
            });
            props.toggleModal();
          }}
        ><i className="ion-ios-plus-empty"></i></button>
      </div>
      { (typeof downloadProgress[songData.id] !== 'undefined' && downloadProgress[songData.id] != -1) && <span>{t('processDownload')}...</span> }
    </div>
  );
};

SongHeader.propTypes = {
  songData: PropTypes.object.isRequired,
  download: PropTypes.func.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  addSongToStoreTemporarily: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default isAuthenticated(SongHeader);
