import React from 'react';
import Playlist from '../../Playlist';
import Pagination from '../../Pagination';
import WithBackgroundImage from '../../WithBgImg';
import LazyloadImage from '../../LazyloadImage';
import { Link } from 'react-router';
import './index.sass';

class ArtistPage extends React.Component {
  state = { showArtistInfo: false };

  showArtistInfo = () => {
    this.setState({ showArtistInfo: !this.state.showArtistInfo });
  }

  truncateInfo = (info) => {
    if (info.length > 100) { return info.substring(0, 100) + '...'; }
    else return info;
  }

  render() {
    const { avatar, cover, songs, artistName, pageChunks, pageChunkIndex, suggestedArtists, dateOfBirth, description,
      replaceQueue, changePageChunkIndex, activePage, t } = this.props;
    const { showArtistInfo } = this.state;
    return (
      <div className="artist-page">
        <WithBackgroundImage className="artist-page-header" src={cover}>
          <div className="artist-box">
            <LazyloadImage className="artist-avatar image-wrapper" src={avatar}>
            </LazyloadImage>
            <div className="aritst-name">
              {artistName}
            </div>
          </div>
        </WithBackgroundImage>
        <button onClick={() => replaceQueue(songs)} className="sc-ir" title="play" style={{ display: "block" }}>
          <img src="/svg/play-button-inside-a-circle.svg" className="circle-play-icon" />
        </button>
        <div className="artist-playlist">
          <Playlist className='' songs={songs} pathEntry="alias" />
          <Pagination
            pageChunks={pageChunks}
            pageChunkIndex={pageChunkIndex}
            type="single-artist"
            artistName={artistName}
            changePageChunkIndex={changePageChunkIndex}
            activePage={activePage}
          />
          <div className='album-playlist-artist-info'>
            <div className="suggested-artists-title">{t('biography') + " " + artistName}</div>
            <div className="album-playlist-artist-thumb image-wrapper">
              <img src={avatar} />
            </div>
            <div className='album-playlist-artist-description'>
              <span style={{color: "black"}}>{t('dob') + ": " + (dateOfBirth ? dateOfBirth : '--/--/--')}</span>
              { !!description ?
                <div>
                <p>
                  {!showArtistInfo && description ? this.truncateInfo(description) : description}
                </p>
                {!showArtistInfo ?
                  <button
                    className='sc-ir show-info-btn'
                    onClick={this.showArtistInfo}>
                    {t('showDes')}
                  </button>
                  :
                  <button
                    className='sc-ir show-info-btn'
                    onClick={this.showArtistInfo}>
                    {t('hideDes')}
                  </button>
                }
                </div> : <p>No data...</p>
              }
            </div>
          </div>
        </div>
        <div className="suggested-artists">
          <div className="suggested-artists-title">{t('suggestedArtists')}</div>
          {suggestedArtists.map((suggestedArtist, index) => <ArtistsList key={index} suggestedArtist={suggestedArtist} />)}
        </div>
      </div>
    );
  }
};

const ArtistsList = ({ suggestedArtist }) =>
  <div className="suggested-artist">
    <img src={suggestedArtist.thumb} title={suggestedArtist.name} />
    <div className="suggested-artist-info">
      <Link
        to={`/artist/${suggestedArtist.link.split('/')[2]}`}
        className='suggested-artist-name'
      >
        {suggestedArtist.name}
      </Link>
    </div>
  </div>

export default ArtistPage;
