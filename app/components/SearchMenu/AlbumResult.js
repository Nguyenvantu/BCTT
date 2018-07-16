import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';

function AlbumResult(props) {
  return (
    <ul className='album-result'>
      <div className='search-li-title'>
        {props.t('albums')}
      </div>
      {
        props.albums.map(album => {
          const link = `/album/playlist/${changeAlias(album.name)}/${album.id}`;
          return <li key={`search-${album.id}`}>
            <div className='search-li-detail'>
              <Link
                to={link}
                onClick={() => props.clearSearchResult()} title={album.name}
              >
                <img src={`http://image.mp3.zdn.vn/thumb/94_94/${album.thumb}`} alt='' />
              </Link>
              <div className='search-li-info'>
                <div title={album.name}>
                  <Link
                    to={link}
                    onClick={() => props.clearSearchResult()}
                  >
                    {album.name}
                  </Link>
                </div>
                <div className='search-li-artist' title={album.artist}>
                  {album.artist}
                </div>
              </div>
            </div>
          </li>
        })
      }
    </ul>
  );
};

export default AlbumResult;
