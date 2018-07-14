import React from 'react';
import PropTypes from 'prop-types';
import SuggestedSection from './SuggestedSection';
import './index.sass';

const propTypes = {
  suggestedSongs: PropTypes.array.isRequired,
};

class SongPageBody extends React.Component {
  state = {
    showLyricIndex: 0,
    showFullLyric: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songData.id !== this.props.songData.id) {
      this.setState({
        showLyricIndex: 0,
        showFullLyric: false
      })
    }
  }

  truncateLyric = (lyric) => {
    if (lyric.length > 800 && !this.state.showFullLyric){
      return lyric.substring(0, 800) + '...';
    }
    return lyric;
  }

  showFull = () => {
    this.setState({showFullLyric: !this.state.showFullLyric})
  }

  nextLyric = () => {
    const total_lyrics = this.props.songData.text_lyrics.length;
    const { showLyricIndex } = this.state;
    if (total_lyrics <= 1 || showLyricIndex >= total_lyrics - 1) return;
    this.setState({ showLyricIndex: showLyricIndex + 1})
  }

  prevLyric = () => {
    const total_lyrics = this.props.songData.text_lyrics.length;
    const { showLyricIndex } = this.state;
    if (total_lyrics <= 1 || showLyricIndex <= 0) return;
    this.setState({ showLyricIndex: showLyricIndex - 1})
  }

  render() {
    const { songData, t } = this.props;
    const { text_lyrics } = songData;
    const { showLyricIndex, showFullLyric } = this.state;
    return (
      <div className="song-body">
        <div className="song-body-lyric">
        {
          text_lyrics &&
          (<div>
            <div className="song-body-lyric-header">
              <div className="song-body-lyric-header-left">
                {t('lyric') + ": "}<b>{songData.name}</b>
              </div>
              <div className="song-body-lyric-header-right">
                {
                  showLyricIndex != 0 ?
                  <i className="active ion-ios-arrow-left" onClick={this.prevLyric}/> : <i/>
                }
                  <span>{` ${t('version')}: ${showLyricIndex + 1}/${text_lyrics.length} `}</span>
                {
                  text_lyrics.length - 1 !== showLyricIndex ?
                  <i className="active ion-ios-arrow-right" onClick={this.nextLyric}></i> : <i/>
                }
              </div>
            </div>
            {
              text_lyrics[showLyricIndex] &&
              <div className="song-body-lyric-content"
                dangerouslySetInnerHTML={{ 
                  __html: this.truncateLyric(text_lyrics[showLyricIndex].content)
                }}
              />
            }
            {
              (text_lyrics[showLyricIndex] && text_lyrics[showLyricIndex].content.length > 800) &&
              <span onClick={this.showFull} className="show-full-lyric">{!showFullLyric ? t('show') : t('hide')}</span>
            }
          </div>) 
        }
        </div>
        {/* <div className="comment-section">
          <div className="comment-section-heading">
            <div>
              <h3>Bình luận <span>(23)</span></h3>
            </div>
            <div>
              <img src={''} />
              <span>Thêm bình luận</span>
            </div>
          </div>
          <div className="comment-body">
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content have-sub">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
              <div className="sub-cm-wrapper">
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <SuggestedSection songs={this.props.suggestedSongs} fetchSong={this.props.fetchSong}
          addSongToQueue={this.props.addSongToQueue} t={t}/>
      </div>
    );
  }
}

SongPageBody.propTypes = propTypes;

export default SongPageBody;
