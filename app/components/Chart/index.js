import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CircularProgressbar from 'react-circular-progressbar';
import { changeAlias } from '../../utils/func';
import WithBackgroundImage from '../WithBgImg';
import LinksByComma from '../LinksByComma';
import { haveDropDown } from '../../HOC';
import './index.sass';

const Chart = (props) => {
  const { chart } = props;
  if (!chart.items) {
    return null;
  }

  return (
    <div className="chart">
      <WithBackgroundImage className="featured-image" src={chart.cover} />
      <ul className="chart-list">
        {
          chart.items.map((item, index) => {
            if (index === 0) {
              return <ChartFirstItem key={`chart-${item.id}`} {...item} {...props} />;
            }
            return <ChartItem key={`chart-${item.id}`} {...item} {...props} />;
          })
        }
      </ul>
    </div>
  );
};

Chart.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
};

const ChartFirstItem = ({ name, order, id, artists, thumbnail, renderDropDown, toggleTrackDropDown, downloadProgress, download }) => {
  const alias = changeAlias(name);
  return (
  <li className="chart-item">
    <Link to={`/song/${alias}/${id}`}>
      <div className="chart-item-order order-first">
        {order}
      </div>
    </Link>
    <div className="chart-item-detail detail-first">
      <div className="chart-item-detail-left">
        <div className="chart-item-title ellipsis" title={name}>
          <Link to={`/song/${alias}/${id}`}>{name}</Link>
        </div>
        <LinksByComma
          className="chart-item-artist ellipsis"
          data={artists}
          definePath={(url) => url.replace('nghe-si', 'artist')}
          defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
          pathEntry="link"
          titleEntry="name"
        />
      </div>
      <div className="chart-item-detail-right">
        {
          typeof downloadProgress[id] !== 'undefined' && downloadProgress[id] != -1
            ? <CircularProgressbar percentage={downloadProgress[id]} text={`${downloadProgress[id]}%`}/>
            :
            <button className='sc-ir' onClick={() => download({
              songName: alias,
              id,
            })}
            >
              <i className="ion-android-download" title="download the track" />
            </button>
        }
        <button
          className="sc-ir ignore-react-onclickoutside"
          onClick={() => toggleTrackDropDown(id, 'Chart')}
        >
          <i className="ion-more"></i>
        </button>
      </div>
    </div>
    {renderDropDown('Chart', { name, id, artists, thumbnail })}
  </li>
  );
}

ChartFirstItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
};

const ChartItem = ({ name, order, id, thumbnail, artists, renderDropDown, toggleTrackDropDown, downloadProgress, download }) => {
  const alias = changeAlias(name);
  return (
  <li className="chart-item">
    <Link to={`/song/${alias}/${id}`}>
      <div className="chart-item-thumb">
        <img src={thumbnail} />
      </div>
    </Link>
    <div className="chart-item-detail">
      <div className="chart-item-detail-left">
        <div className="chart-item-order">{order}</div>
        <div className="chart-item-info">
          <div className="chart-item-title ellipsis" title={name}>
            <Link to={`/song/${alias}/${id}`}>{name}</Link>
          </div>
          <LinksByComma
            className="chart-item-artist ellipsis"
            data={artists}
            pathEntry="link"
            titleEntry="name"
            definePath={(url) => url.replace('nghe-si', 'artist')}
            defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
          />
        </div>
      </div>
      <div className="chart-item-detail-right">
        {
          typeof downloadProgress[id] !== 'undefined' && downloadProgress[id] != -1
            ? <CircularProgressbar percentage={downloadProgress[id]} text={`${downloadProgress[id]}%`}/>
            :
            <button className='sc-ir' onClick={() => download({
              songName: alias,
              id,
            })}
            >
              <i className="ion-android-download" title="download the track" />
            </button>
        }
        <button
          className="sc-ir ignore-react-onclickoutside"
          onClick={() => toggleTrackDropDown(id, 'Chart')}
        >
          <i className="ion-more"></i>
        </button>
      </div>
    </div>
    {renderDropDown('Chart', { name, id, artists, thumbnail })}
  </li>
  );
}

ChartItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired,
};

export default haveDropDown(Chart);
