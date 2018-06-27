import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import { haveDropDown } from '../../HOC';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import LinksByComma from '../LinksByComma';
import LazyloadImage from '../LazyloadImage';

class TrackList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  downloadSong = (criteria) => () => {
    if (!this.props.authenticated) {
      return this.context.router.push('/login');
    }
    return this.props.download(criteria);
  }

  render() {
    const { isFading } = this.props;
    return (
      <div className='hp-track-list-wrapper'>
        <ul className={`hp-track-list ${isFading ? 'isFading' : ''}`}>
          {this.props.tracks.map(track => {
            let { id, name, thumbnail, artists, order } = track;
            return (
            <li key={track.id}>
              {this.props.renderDropDown('Track', { id, name, thumbnail, artists })}
              <div className="trackPosition">
                {order}
              </div>
              <LazyloadImage src={thumbnail} className='track-thumb image-wrapper' />
              <div className="trackDetail">
                <div className="trackTitle">
                  <Link to={`song/${changeAlias(name)}/${id}`}>{name}</Link>
                </div>
                <LinksByComma
                  className="trackArtist"
                  data={artists}
                  titleEntry="name"
                  pathEntry="link"
                  definePath={(link) => link.replace('/nghe-si/', '/artist/')}
                  defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
                />
              </div>
              <div className="trackActions">
                <div className="hp-track-toolbar">
                  <Track downloadProgress={this.props.downloadProgress} name={track.name} id={track.id} download={this.downloadSong} />
                  <button className='sc-ir'><i className="ion-android-share" title="share" /></button>
                  <button
                    className='sc-ir ignore-react-onclickoutside'
                    onClick={this.props.toggleTrackDropDown.bind(null, id, 'Track')}>
                    <i className="ion-more" />
                  </button>
                </div>
              </div>
            </li>
            )
          })
          }
          {this.props.isLoading && <div className='loader'></div>}
        </ul>
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  renderDropDown: PropTypes.func.isRequired,
};

export default haveDropDown(TrackList);

