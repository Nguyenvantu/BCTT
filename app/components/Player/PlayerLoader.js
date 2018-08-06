import React from 'react';

export const PlayerLoader = () => (
  <div className='player-loading'>
    <div className="player-overlay" />
    <div className='player-loader'>
      <img src='/svg/bars.svg' alt=""/><span style={{ color: '#BFC9CA' }}>Loading...</span>
    </div>
  </div>
);