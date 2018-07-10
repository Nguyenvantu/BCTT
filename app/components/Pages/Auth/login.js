import React from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from './TextInputGroup';
import { slideInRight } from '../../../actions/ui';
import { login } from '../../../actions/auth';
import './index.sass';

class LogInPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    animate: false,
    username: '',
    password: '',
  };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      this.setState({ leave: true });
      setTimeout(() => {
        this.props.dispatch(slideInRight()); // UI action
        this.context.router.push('/');
      }, 700);
    }
  }

  goToSignUpPage(e) {
    e.preventDefault();
    this.setState({ leave: true });
    setTimeout(() => {
      this.context.router.push('/signup');
    }, 700);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.dispatch(login({ username, password }));
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate &&
      (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
    const errors = this.props.auth.errors;
    const {t} = this.props;

    return (
      <div className={className}>
        {t('titleSignIn')}
        <br />
        <br />
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              placeholder={t('username')}
              name="username"
              error={t(errors.username)}
              onChange={this.onChange.bind(this)}

            />
            <TextInputGroup
              placeholder={t('password')}
              name="password"
              type="password"
              error={t(errors.password)}
              onChange={this.onChange.bind(this)}
            />
            <button type="submit" id="sign_up" disabled={this.props.auth.isProcessing}>
              {!this.props.auth.isProcessing ? t('signIn') : t('processing')}
            </button>
          </form>
        </div>
        <footer className="login-footer">
          {t('footerSignIn1')}, <a href="#" onClick={this.goToSignUpPage.bind(this)}>{t('footerSignIn2')}</a>
        </footer>
      </div>
    );
  }

  render() {
    return (
      <div className="auth">
        <div className="auth-box-wrapper">
          {this.renderAuthBox()}
        </div>
      </div>
    );
  }
}

LogInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    isProcessing: PropTypes.bool,
  }),
};

export default LogInPage;


