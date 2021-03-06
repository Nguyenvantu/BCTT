import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash.chunk';
import Pagination from '../Pagination';
import './index.sass';
import { changeAlias } from '../../utils/func';
import { Link } from 'react-router';

const MainView = (props) => {
  const { type, isLoading } = props;
  if (isLoading) return <div className="loader"></div>;

  return (
    <div>
      {
        type === 'album'
          ? <AlbumView {...props} />
          : <ArtistView {...props}/>
      }
    </div>
  );
};

MainView.propTypes = {
  defaultAlbums: PropTypes.array,
  albums: PropTypes.array,
  pageChunks: PropTypes.array,
  pageChunkIndex: PropTypes.number,
  changePageChunkIndex: PropTypes.func,
  chunkSize: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const AlbumView = (props) => {
  const { params, chunkSize, defaultAlbums, albums, Card, location, t } = props;
  return (
    <div className="view">
      { !albums.length && location.pathname === '/albums' &&
        <Default origins={defaultAlbums} Card={Card} chunkSize={chunkSize} t={t}/>
      }
      { chunk(albums, chunkSize).map((chunk, index) =>
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card}/>
      )}
      {
        params.id && params.genre && albums.length ?
          <Pagination
            {...params}
            pageChunks={props.pageChunks}
            pageChunkIndex={props.pageChunkIndex}
            changePageChunkIndex={props.changePageChunkIndex}
            type='album'
            activePage={location.query.page}
          /> : null
      }
    </div>
  );
};

const ArtistView = (props) => {
  const { params, chunkSize, defaultArtists, artists, Card, location, t } = props;

  return (
    <div className="view">
      { !artists.length && location.pathname === '/artists' &&
        <Default origins={defaultArtists} Card={Card} chunkSize={chunkSize} t={t}/>
      }

      { chunk(artists, chunkSize).map((chunk, index) =>
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card}/>
      )}
      {
        params.id && params.genre && artists.length ?
          <Pagination
            {...params}
            pageChunks={props.pageChunks}
            pageChunkIndex={props.pageChunkIndex}
            changePageChunkIndex={props.changePageChunkIndex}
            type='artist'
            activePage={location.query.page}
          /> : null
      }
    </div>
  );
};


const Default = ({ origins, Card, chunkSize, t }) => (
  <div>
    { origins.map(origin =>
      <DefaultCards key={origin.id} {...origin} Card={Card} chunkSize={chunkSize} t={t}/>
    )}
  </div>
);

const DefaultCards = ({ title, id, albums, artists, Card, chunkSize, t }) => {
  let href = '#';
  switch (id){
    case 'IWZ9Z08I': href = albums ? `/albums/Viet-Nam/${id}` : `/artists/Viet-Nam/${id}`; break;
    case 'IWZ9Z08O': href = albums ? `/albums/Au-My/${id}` : `/artists/Au-My/${id}`; break;
    case 'IWZ9Z08W': href = albums ? `/albums/Han-Quoc/${id}` : `/artists/Han-Quoc/${id}`; break;
    case 'IWZ9Z086': href = albums ? `/albums/Khong-Loi/${id}` : `/artists/Khong-Loi/${id}`; break;
    default: break;
  }
  return <div className="view-cards">
    <div className="view-cards-title">
      <Link to={href}>
        {t(changeAlias(title))} <i className='ion-chevron-right'></i>
      </Link>
    </div>
    { chunk(albums || artists, chunkSize).map((chunk, index) => (
      <Row key={`row-chunk${index}`} chunk={chunk} Card={Card} chunkSize={chunkSize}/>
    ))}
  </div>
  
};

const Row = ({ chunk, Card }) => (
  <div className="view-cards-row">
    { chunk.map(item => <Card key={item.id || item.name} {...item} />) }
  </div>
);

export default MainView;
