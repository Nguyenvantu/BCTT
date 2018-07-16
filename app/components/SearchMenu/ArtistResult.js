import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';

function ArtistResult(props) {
  return (
    <ul className='artist-result'>
      <div className='search-li-title'>
        {props.t('artists')}
      </div>
      {
        props.artists.map(artist =>
          <li key={artist.id}>
            <div className='search-li-detail'>
              <Link
                to={`/artist/${artist.aliasName}`}
                onClick={() => props.clearSearchResult() } title={artist.name}
              >
                <img src={`http://image.mp3.zdn.vn/thumb/94_94/${artist.thumb}`} alt='' />
              </Link>
              <div className='search-li-info'>
                <div className='search-li-artist' title={artist.name}>
                  <Link
                    to={`/artist/${artist.aliasName}`}
                    onClick={() => props.clearSearchResult() }
                  >
                    {artist.name}
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )
      }
    </ul>
  );
};

export default ArtistResult;
