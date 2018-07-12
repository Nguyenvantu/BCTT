import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { Link, browserHistory } from 'react-router';
import PlayerLoader from './PlayerLoader';
import { initAnalyzer, frameLooper } from '../../utils/initAnalyzer';
import LinksByComma from '../LinksByComma';
import { requestInterval, clearRequestInterval } from '../../requestInterval';
import { changeAlias, getSongUrl, isTwoObjectEqual, formatTime } from '../../utils/func';

import './index.sass';


class Player extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      progress: 0,
      isSeeking: false,
      isPlaying: false,
      loop: false,
      isRandom: false
    };
    // this.audio = React.createRef();
  }

  componentDidMount() {
    // window.addEventListener('blur', this.windowBlur.bind(this));
    this.audio = this.refs.audio;
    this.audio.addEventListener('loadeddata', this.onLoadedData.bind(this));
    this.audio.addEventListener('play', this.onPlay.bind(this));
    this.audio.addEventListener('pause', this.onPause.bind(this));
    this.audio.addEventListener('ended', this.onEnded.bind(this));

    // initialize the audio analyzer
    initAnalyzer(this.audio);
  }

  // windowBlur() {
  //   if (this.state.isPlaying) {
  //     clearInterval(this.timer);
  //   }
  // }

  componentWillUnmount() {
    clearRequestInterval(this.timer);
  }

  onLoadedData() {
    if (this.audio.readyState >= 2) {
      this.audio.play();
    }
  }

  onPlay() {
    this.setState({ isPlaying: true })
    this.timer = requestInterval(this.update.bind(this), 20);
    // start();
  }

  onPause() {
    clearRequestInterval(this.timer);
    // stop();
  }

  onEnded() {
    clearRequestInterval(this.timer);
    this.playPrevOrNextSong(this.state.isRandom ? 'random' : 'next');
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isPlaying !== this.state.isPlaying && !!this.audio) {
      if (nextState.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }

    if (this.props.songData.id !== nextProps.songData.id && !!this.timer) {
      clearRequestInterval(this.timer);
      // stop();
    }

    if (!isTwoObjectEqual(nextProps.queueIds, this.props.queueIds) &&
      !nextProps.queueIds.includes(this.props.songData.id) &&
      nextProps.queue[0]
    ) {
      const { name, id } = nextProps.queue[0];
      this.props.fetchSong(changeAlias(name), id); // changeAlias {func}: escape ut8 character
      if (/\/song\//.test(window.location.href)) {
        // only redirect if is on the song route
        browserHistory.push(`/song/${changeAlias(name)}/${id}`);
      }
    }

    const nextPercent = nextProps.playerState.playedPercent;
    const currentPercent = this.props.playerState.playedPercent;

    if (nextPercent != currentPercent && nextPercent) {
      this.audio.currentTime = this.audio.duration * nextPercent / 100;
    }
  }

  findSong(prevOrnext) {
    const queue = this.props.queue;
    const currId = this.props.songData.id;
    let index = 0;
    for (let i = 0, length = queue.length; i < length; i++) {
      if (queue[i].id === currId) {
        switch (prevOrnext) {
          case 'next':
            index = (i + 1) % length;
            // replay the queue if the index is equal the queue length otherwise play the next song
            break;
          case 'prev':
            index = (i + length - 1) % length;
            // play the last song in the queue if the index is 0 otherwise play the prev song
            break;
          case 'random':
            let random = Math.floor(Math.random() * queue.length);
            while (random === i && queue.length > 1)
              random = Math.floor(Math.random() * queue.length);
            index = random;
            // play the random song with next index will be different the prev index
            break;
          default:
            return null;
        }
        return queue[index];
      }
    }

    return undefined;
  }

  playPrevOrNextSong(prevOrnext) {
    const prevOrnextSong = this.findSong(prevOrnext);
    if (!prevOrnextSong) return;

    const { name, alias, id } = prevOrnextSong;

    this.props.togglePushRoute(true); // enable .push for browserHistory

    if (alias) {
      this.props.fetchSong(alias, id)
      // .then(() => {
      //   continu();
      // })
    } else {
      this.props.fetchSong(changeAlias(name), id) // changeAlias {func}: escape ut8 character
      // .then(() => {
      //   continu();
      // })
    }
  }

  togglePlayBtn() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  updateProgressbar() {
    let val = 0;
    if (this.audio.currentTime > 0) {
      val = (this.audio.currentTime / this.audio.duration * 100).toFixed(2);
    }
    if (!this.state.isSeeking) {
      this.setState({ progress: val });
    }
  }

  update() {
    const lyric = this.props.songData.lyric;
    
    this.updateProgressbar();
    frameLooper();

    if (!lyric.length) {
      clearRequestInterval(this.timer);
      return;
    }
    const {
      playerState: { lyric1, lyric2 },
      updateLyricPercent,
      updateLyric,
    } = this.props;
    const currentTime = this.audio.currentTime;
    // reset lyric state
    if (currentTime > lyric[lyric.length - 1].end || currentTime) {
      // clear lyric when the this.audio is playing with beat only
      updateLyric([], []);
    }

    for (let i = 0; i < lyric.length; i++) {
      if (i < lyric.length - 1 &&
        i % 2 == 0 &&
        currentTime >= lyric[i].start &&
        currentTime <= lyric[i + 1].end) {
        updateLyric(lyric[i], lyric[i + 1]);break;
      }
    }

    if (currentTime <= lyric1.end) {
      let width = (currentTime - lyric1.start) / (lyric1.end - lyric1.start) * 100;
      // width = Math.ceil(width);
      updateLyricPercent(Math.ceil(width), 0);
    } else if (currentTime <= lyric2.end) {
      // updateLyricPercent(null, 0);
      let width = (currentTime - lyric2.start) / (lyric2.end - lyric2.start) * 100;
      // width = Math.ceil(width);
      // width = width <= 0 ? 0 : (width > 96 ? 100 : width); // fill the karaoke text
      updateLyricPercent(100, Math.ceil(width));
    }
  }

  handleChange(value) {
    this.setState({ progress: value, isSeeking: true });
  }

  handleChangeComplete(value) {
    if (value == 100) {
      this.props.updateLyric([], []);
    }

    this.audio.play();

    if (this.audio.duration) {
      this.audio.currentTime = (value / 100) * this.audio.duration;
    }

    this.setState({ isSeeking: false });
  }

  render() {
    const { songData, queue } = this.props;
    const { name, id } = songData;
    return (
      <div className='player'>
        <audio
          autoPlay
          src={songData.source && songData.source['128']}
          crossOrigin = 'anonymous'
          ref='audio'
          loop={this.state.loop}
        />
        <img
          src={songData.thumbnail}
          className="player-song-thumbnail"
          alt=""
        />
        <div className="player-info">
          <Link
            to={getSongUrl(name, id)}
            className='ellipsis player-song-title'
            title={songData.name}
          >{songData.name}
          </Link>
          <LinksByComma
            className="ellipsis player-info-artists comma"
            data={songData.artists}
            titleEntry="name"
            pathEntry="link"
            definePath={(link) => link.replace('/nghe-si/', '/artist/')}
            defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
          />
          {/* <Link
            to={`/artist/${changeAlias(artists[0])}`}
            className='ellipsis'
            title={songData.artist}
          >{songData.artist}
          </Link> */}
        </div>
        <div className="player-btns">
          <button
            className='sc-ir player-btn'
            onClick={this.playPrevOrNextSong.bind(this, 'prev')}
          >
            <i className="ion-ios-rewind" style={{color: "rgb(173, 181, 189)"}}></i>
          </button>
          <button
            className='sc-ir player-btn'
            onClick={this.togglePlayBtn.bind(this)}
          >
            <i className={`ion-${this.state.isPlaying ? 'pause' : 'play'}`} style={{color: "rgb(173, 181, 189)"}}></i>
          </button>
          <button
            className='sc-ir player-btn'
            onClick={this.playPrevOrNextSong.bind(this, 'next')}
          >
            <i className="ion-ios-fastforward" style={{color: "rgb(173, 181, 189)"}}></i>
          </button>
        </div>
        <div className="player-seek">
          <span>{(this.audio && this.audio.currentTime) ? formatTime(this.audio.currentTime) : '0:00'}</span>
          <InputRange
            maxValue={100}
            minValue={0}
            value={parseInt(this.state.progress, 10)}
            onChange={this.handleChange.bind(this)}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
          <span>
            {this.audio &&
              (!isNaN(this.audio.duration) && formatTime(this.audio.duration))
            }
          </span>
        </div>
        <div className="player-other">
          <button className="sc-ir" title="Loop">
            <i
              className="ion-loop"
              style={{ color: this.state.loop ? '#23B89A' : '#adb5bd' }}
              onClick={() => this.setState({ loop: !this.state.loop })}
            ></i>
          </button>
          <button className="sc-ir" title="random">
            <i
              className="ion-shuffle"
              style={{ color: this.state.isRandom ? '#23B89A' : '#adb5bd' }}
              onClick={() => this.setState({ isRandom: !this.state.isRandom })}
            ></i>
          </button>
          <button
            className='sc-ir player-btn queue-btn'
            onClick={this.props.toggleQueue}
          >
            <span className="queue-circle">{queue.length}</span>
            <img src='/svg/playlist.svg' />
          </button>
        </div>
        {this.props.isFetching && <PlayerLoader />}
      </div>
    );
  }
}

Player.propTypes = {
  playerState: PropTypes.object.isRequired,
  updateLyric: PropTypes.func.isRequired,
  updateLyricPercent: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
  fetchSong: PropTypes.func.isRequired,
  queue: PropTypes.array.isRequired,
  queueIds: PropTypes.array,
  toggleQueue: PropTypes.func.isRequired,
  togglePushRoute: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Player;
