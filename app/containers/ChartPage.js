import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { getChart } from '../actions/chart';
import { download } from '../actions/song';

class ChartPage extends Component {

  render() {
    return (
      <Pages.ChartPage
        pop={this.props.pop}
        kpop={this.props.kpop}
        vpop={this.props.vpop}
        download={this.props.download}
        downloadProgress={this.props.downloadProgress}
      />
    );
  }
}

function mapStateToProps(state) {
  const { downloadProgress } = state.UIState;
  return {
    ...state.chartState, downloadProgress
  };
}

export default connect(mapStateToProps, { getChart, download })(ChartPage);
