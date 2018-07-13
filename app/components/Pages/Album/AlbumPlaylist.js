import React from 'react';
import Playlist from '../../Playlist';
import { Karaoke } from '../../../containers';
import { isEmpty } from '../../../utils/func';
import './album_playlist.sass';
import { Link } from 'react-router';
import LinksByComma from '../../LinksByComma';

class AlbumPlaylist extends React.Component {
  state = { showArtistInfo: false };

  showArtistInfo() {
    this.setState({ showArtistInfo: !this.state.showArtistInfo });
  }

  truncateInfo(info) {
    if (info.length > 100) { return info.substring(0, 100) + '...'; }
    else { return info; }
  }

  render() {
    const { playlist, replaceQueue, isPlaying, suggestedAlbums, t } = this.props;
    const { showArtistInfo } = this.state;
    if (isEmpty(playlist)) return null;
    playlist.genres = playlist.genres.filter(item => item)
    return (
      <div>
      <div className='album-playlist'>
        <div className="album-playlist-header">
          <div className="album-playlist-thumb image-wrapper">
            <img src={playlist.album_playlist_thumb} alt=""/>
          </div>
          <div className="ap-info">
            <div className="ap-title">
              {playlist.album_title}
            </div>
            <div className="ap-artist">{playlist.artist}</div>
            <div className="ap-releaseY"><span>{t('release')}:</span> {playlist.release_year}</div>
            <div>
              {t('genres') + ": " + playlist.genres.join(', ')}
            </div>
          </div>
        </div>
        <div className="album-playlist-content">
          {
            // isPlaying && <Karaoke
            //   className='karaoke-album-playlist'
            //   fontSize="23px"
            // />
          }
          <div className='playlist-play-btn'>
            <button onClick={() => replaceQueue(playlist.songs)} className="sc-ir" title="play">
              <img src="/svg/play-button-inside-a-circle.svg" className="circle-play-icon"/>
            </button>
          </div>

          <Playlist songs={playlist.songs} className='ap' pathEntry="alias" />

          <div className='album-playlist-artist-info'>
            <div className="album-playlist-artist-thumb image-wrapper">
              <img src={playlist.artist_thumb} />
            </div>
            <div className='album-playlist-artist-description'>
              <p>
                { !showArtistInfo ? this.truncateInfo(playlist.artist_info) : playlist.artist_info }

              </p>
              { !showArtistInfo ?
                <button
                  className='sc-ir show-info-btn'
                  onClick={this.showArtistInfo.bind(this)}>
                  {t('showDes')}
                </button>
                :
                <button
                  className='sc-ir show-info-btn'
                  onClick={this.showArtistInfo.bind(this)}>
                  {t('hideDes')}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="suggested-albums">
        <div className="suggested-albums-title">{t('suggestedAlbums')}</div>
        {suggestedAlbums.map((suggestedAlbum, index) => <ArtistsList key={index} suggestedAlbum={suggestedAlbum}/>)}
      </div>
      </div>
    );
  }
}

export default AlbumPlaylist;

const ArtistsList = ({ suggestedAlbum }) => 
  <div className="suggested-album">
    <img src={suggestedAlbum.thumbnail} title={suggestedAlbum.name} />
    <div className="suggested-album-info">
      <Link
        to={`/album/playlist/${suggestedAlbum.link.split('/')[2]}/${suggestedAlbum.id}`}
        className='suggested-album-name' title={suggestedAlbum.name}
      >
        {suggestedAlbum.name}
      </Link>
      <LinksByComma
        className="suggested-album-artist"
        data={suggestedAlbum.artists}
        titleEntry="name"
        pathEntry="link"
        definePath={(link) => link.replace('/nghe-si/', '/artist/')}
        defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
      />
    </div> 
  </div>
