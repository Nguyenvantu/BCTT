import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../../utils/func';
import LinksByComma from '../../LinksByComma';

const SongList = ({ song, fetchSong, addSongToQueue, t }) => 
  <div className="suggested-song" key={song.id}>
    <img src={song.thumbnail} alt="" />
    <div className="suggested-song-info">
      <Link
        to={`/song/${changeAlias(song.name)}/${song.id}`}
        className='suggested-song-name'>{song.name}</Link>
      <LinksByComma
        className="trackArtist"
        data={song.artists}
        titleEntry="name"
        pathEntry="link"
        definePath={(link) => link.replace('/nghe-si/', '/artist/')}
        defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
      />
    </div>
    <div className="suggested-song-action">
      <button className='sc-ir ignore-react-onclickoutside' style={{ padding: "1px" }} title={t('addToNextUp')}
        onClick={() => addSongToQueue(song)}
      >
        <img src="/svg/queue-add.svg" style={{ height: '33px', width: '33px', color: "red" }} />
      </button>
      <button title={t('play')}
        className='sc-ir ignore-react-onclickoutside' style={{ padding: "1px" }}
        onClick={() => fetchSong(song.name, song.id, false)}
      >
        <img
          src="/svg/queue-next.svg"
          style={{ height: '25px', width: '25px', marginRight: '5px' }}
        />
      </button>
    </div>
  </div>

function SuggestedSection(props) {

  const list1 = props.songs.slice(0, 10);
  const list2 = props.songs.slice(11);
  return (
    <div className="suggested-section">
      <div className="suggested-artists-title">
        <span>{props.t('suggested')}</span>
      </div>
      <div className="suggested-section-body suggested-right">
        {/* {songList({songList: list1, fetchSong })} */}
        {list1.map(song =>
          <SongList key={song.id} song={song} fetchSong={props.fetchSong} addSongToQueue={props.addSongToQueue} t={props.t}/>)}
      {/* </div>
      <div className="suggested-section-body suggested-right"> */}
        {/* {songList({songList: list2, fetchSong })} */}
        {list2.map(song =>
          <SongList key={song.id} song={song} fetchSong={props.fetchSong} addSongToQueue={props.addSongToQueue} t={props.t}/>)}
      </div>
    </div>
  );
}

export default SuggestedSection;
