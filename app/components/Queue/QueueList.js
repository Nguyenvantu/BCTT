import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getSongUrl } from '../../utils/func';
import LazyloadImage from '../LazyloadImage';
import LinksByComma from '../LinksByComma';

const Li = ({ name, id, thumbnail, alias, artist, artists, removeSongFromQueue, fetchSong, songData }) => {
  const urlSong = getSongUrl(alias || name, id)
  return (
    <li >
      {songData.data.id === id ? <canvas id="analyser_render_2"></canvas> : null}
      <Link to={urlSong}>
        <LazyloadImage
          src={thumbnail || '/images/default.jpg'}
          className={`queue-list-thumb ${songData.data.id === id ? 'rotation' : ''} `}
        />
      </Link>
      <div className="queue-list-info">
        <div className="queue-track-title ellipsis" title={name}>
          <Link to={urlSong}>{name}</Link>
        </div>
        {/* <div className="queue-track-artist ellipsis"> */}
          <LinksByComma
            className={`queue-track-artist ellipsis`}
            data={artists || []}
            titleEntry="name"
            pathEntry="link"
            definePath={(link) => link.replace('/nghe-si/', '/artist/')}
            defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
          />
        {/* </div> */}
      </div>

      <div className="queue-track-actions">
        {songData.data.id !== id ?
          <i className='ion-play'
            onClick={() => fetchSong(name, id)} title="play"></i>
          :
          <i className='ion-play' style={{ color: "transparent", cursor: "unset" }}></i>
        }
        <i className="ion-trash-b" onClick={() => removeSongFromQueue(id)} title="remove from list"></i>
      </div>
    </li>
  );
};

export default function QueueList({ songs, removeSongFromQueue, fetchSong, songData }) {
  return (
    <ul className="queue-list">
      <ReactCSSTransitionGroup
        transitionName="queue-item"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {songs.map(song =>
          <Li key={`queue-${song.id}`} {...song} removeSongFromQueue={removeSongFromQueue}
            songData={songData} fetchSong={fetchSong} />
        )}
      </ReactCSSTransitionGroup>
    </ul>
  );
}
