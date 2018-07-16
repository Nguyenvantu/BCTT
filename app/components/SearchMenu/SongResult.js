import React from 'react';
import { Link } from 'react-router';
import { getSongUrl } from '../../utils/func';

function SongResult({ songs, clearSearchResult, t }) {
  return (
    <ul className='song-result'>
      <div className='search-li-title search-song-title'>
        {t('songs')}
      </div>
      {
        songs.map(song => {
          const link = getSongUrl(song.name, song.id);
          return (
          <li key={`song-result${song.id}`}>
            <div className='search-li-detail'>
              <Link
                to={link}
                onClick={() => clearSearchResult()} title={song.name}
              >
                <img src={`http://image.mp3.zdn.vn/thumb/94_94/${song.thumb}`} alt='' />
              </Link>
              <div className='search-li-info'>
                <div title={song.name}>
                  <Link
                    to={link}
                    onClick={() => clearSearchResult()}
                  >{song.name}</Link>
                </div>
                <div className='search-li-artist' title={song.artist}>
                  { song.artist }
                </div>
              </div>
            </div>
          </li>
        )})
      }
    </ul>
  );
}

export default SongResult;
