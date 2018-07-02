import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getSongUrl } from '../../utils/func';
import LazyloadImage from '../LazyloadImage';

const Li = ({ name, id, thumbnail, alias, artist, artists, removeSongFromQueue, fetchSong, songData }) => {
  return (
    <li >
      {songData.data.id === id ? <canvas id="analyser_render_2"></canvas> : null}
      <LazyloadImage
        src={thumbnail || 'http://zmp3-photo-td.zadn.vn/noimagex'}
        className="queue-list-thumb"
      />
      <div className="queue-list-info">
        <div className="queue-track-title ellipsis" title={name}>
          <Link to={getSongUrl(alias || name, id)}>{name}</Link>
        </div>
        <div className="queue-track-artist ellipsis">
          {artist || (artists && (Array.isArray(artists) ? artists.map(artist => artist.name).join(', ') : artists))}
        </div>
      </div>

      <div className="queue-track-actions">
        {songData.data.id !== id ?
          <i className='ion-play'
            onClick={() => fetchSong(name, id)} title="play"></i>
          :
          <i className='ion-play' style={{ color: "#85929e", cursor: "unset" }} title="playing..."></i>
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
