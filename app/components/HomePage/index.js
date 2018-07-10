import React from 'react';
import PropTypes from 'prop-types';
import TrackList from './TrackList';
import Chart from '../Chart';
import Choices from './Choices';
import './index.sass';

class ChartPanel extends React.Component {
  state = { activeChart: 'pop' }
  handleOnClick(alias) {
    this.props.changeActiveChart(alias);
    this.setState({ activeChart: alias });
  }

  render() {
    const {t} = this.props;
    const list = [
      { alias: 'pop', title: t('topUs') },
      { alias: 'kpop', title: t('topKr') },
      { alias: 'vpop', title: t('topVn') },
    ];
    const { activeChart } = this.state;
    return (
      <div className="chart-panel">
        {
          list.map(item =>
            <button
              key={item.alias}
              onClick={() => this.handleOnClick(item.alias)}
              className={`sc-ir ${activeChart === item.alias ? 'chart-panel-btn-active' : ''}`}
            >{item.title}</button>
          )
        }
      </div>
    );
  }
}

const HomePage = (props) =>
  <div className='homepage home-container'>
    <div className="home-nav">
      <Choices fetchTracks={props.fetchTracks} activeChoiceId={props.activeChoiceId} t={props.t}/>
    </div>
    <TrackList {...props} />
    <div className='chart-wrapper'>
      <ChartPanel changeActiveChart={props.changeActiveChart} t={props.t}/>
      <Chart t={props.t} chart={props.chart} downloadProgress={props.downloadProgress} download={props.download}/>
    </div>
  </div>;

HomePage.propTypes = {
  tracks: PropTypes.array.isRequired,
  chart: PropTypes.object.isRequired,
  changeActiveChart: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  fetchTracks: PropTypes.func.isRequired,
  isFading: PropTypes.bool.isRequired,
  activeChoiceId: PropTypes.string,
  download: PropTypes.func.isRequired,
  t: PropTypes.func
};


export default HomePage;
