import React from 'react';
import PropTypes from 'prop-types';
import QueueList from './QueueList';
import './index.sass';

function Queue({ songs, toggleQueue, clearQueue, removeSongFromQueue, show, fetchSong, songData, t }) {
  return (
    <div className={`queue${show ? ' queue-visible' : ''}`}>
      <div className="queue-panel">
        <div className="queue-title">
          {t('nextUp')}
        </div>
        <div className="queue-clear">
          <button onClick={clearQueue}>{t('clear')}</button>
        </div>
        <div className="queue-hide">
          <button className="sc-ir" onClick={toggleQueue}>Hide queue</button>
        </div>
      </div>
      <QueueList songData={songData} songs={songs} removeSongFromQueue={removeSongFromQueue} fetchSong={fetchSong}/>
    </div>
  );
}

Queue.propTypes = {
  songs: PropTypes.array.isRequired,
  toggleQueue: PropTypes.func.isRequired,
  removeSongFromQueue: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  fetchSong: PropTypes.func.isRequired
};

export default Queue;

