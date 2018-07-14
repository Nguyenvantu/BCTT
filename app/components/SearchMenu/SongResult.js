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
        songs.map(song => (
          <li key={`song-result${song.id}`}>
            <div className='search-li-detail'>
              <img src={`http://image.mp3.zdn.vn/thumb/94_94/${song.thumb}`} alt='' />
              <div className='search-li-info'>
                <div>
                  <Link
                    to={getSongUrl(song.name, song.id)}
                    onClick={() => clearSearchResult()}
                  >{song.name}</Link>
                </div>
                <div className='search-li-artist'>
                  { song.artist }
                </div>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default SongResult;
