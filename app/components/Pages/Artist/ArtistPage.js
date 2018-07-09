import React from 'react';
import Playlist from '../../Playlist';
import Pagination from '../../Pagination';
import WithBackgroundImage from '../../WithBgImg';
import LazyloadImage from '../../LazyloadImage';
import { Link } from 'react-router';
import './index.sass';

const ArtistPage = (props) => {
  const { avatar, cover, songs, artistName, pageChunks, pageChunkIndex, suggestedArtists } = props;

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
      <button onClick={() => props.replaceQueue(songs)} className="sc-ir" title="play" style={{display: "block"}}>
        <img src="/svg/play-button-inside-a-circle.svg" className="circle-play-icon"/>
      </button>
      <div className="artist-playlist">
        <Playlist className='' songs={songs} pathEntry="alias" />
        <Pagination
          pageChunks={pageChunks}
          pageChunkIndex={pageChunkIndex}
          type="single-artist"
          artistName={artistName}
          changePageChunkIndex={props.changePageChunkIndex}
          activePage={props.activePage}
        />
      </div>
      <div className="suggested-artists">
      <div className="suggested-artists-title">NGHỆ SĨ TƯƠNG TỰ</div>
      {suggestedArtists.map((suggestedArtist, index) => <ArtistsList key={index} suggestedArtist={suggestedArtist}/>)}
      </div>
    </div>
  );
};

const ArtistsList = ({suggestedArtist}) => 
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
