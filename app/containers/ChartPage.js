import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { getChart } from '../actions/chart';
import { download } from '../actions/song';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

class ChartPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  downloadSong = (criteria) => {
    if (!this.props.authenticated) {
      return this.context.router.push('/login');
    }
    return this.props.download(criteria);
  }
  render() {
    return (
      <Pages.ChartPage
        pop={this.props.pop}
        kpop={this.props.kpop}
        vpop={this.props.vpop}
        download={this.downloadSong}
        downloadProgress={this.props.downloadProgress}
        t={this.props.t}
      />
    );
  }
}

function mapStateToProps(state) {
  const { downloadProgress } = state.UIState;
  const { authenticated } = state.auth;
  return {
    ...state.chartState, downloadProgress, authenticated
  };
}

export default translate('homePage')(connect(mapStateToProps, { getChart, download })(ChartPage));
