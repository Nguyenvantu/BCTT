import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { resetSlideInRight } from '../actions/ui';
import { clearErrors } from '../actions/auth';
import { isEmpty } from '../utils/func';
import { translate } from 'react-i18next';

class LogInPage extends Component {
  componentDidMount() {
    if (this.props.slideInRight) {
      this.props.dispatch(resetSlideInRight());
    }

    // clear errors in the auth state from the previous authentication attempt
    if (!isEmpty(this.props.auth.errors)) {
      this.props.dispatch(clearErrors());
    }
  }
  render() {
    return <Pages.LogInPage
      dispatch={this.props.dispatch}
      auth={this.props.auth}
      t={this.props.t}
    />;
  }
}

function mapStateToProps({ auth, UIState }) {
  return { auth, slideInRight: UIState.slideInRight };
}

export default translate('nav')(connect(mapStateToProps)(LogInPage));
