import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';
import { fetchTracks } from '../actions/home';
import { download } from '../actions/song';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

class HomePageContainer extends Component {
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
      <HomePage {...this.props} download={this.downloadSong} />
    );
  }
}

function mapStateToProps(state) {
  const { activeChart } = state.chartState;
  const { isLoading, tracks } = state.trackState;
  const { authenticated } = state.auth;

  return {
    chart: state.chartState[activeChart],
    downloadProgress: state.UIState.downloadProgress,
    isFading: state.UIState.isFading,
    activeChoiceId: state.trackState.activeId,
    isLoading,
    tracks,
    authenticated,
  };
}

export default translate('homePage')(connect(mapStateToProps,
  {
    changeActiveChart,
    download,
    fetchTracks,
  })(HomePageContainer));

