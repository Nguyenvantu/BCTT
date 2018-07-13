import React from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from './TextInputGroup';
import { slideInRight } from '../../../actions/ui';
import { signup } from '../../../actions/auth';
import './index.sass';

class SignUpPage extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    animate: false,
    username: '',
    password: '',
    passwordConfirmation: '',
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirmation } = this.state;

    this.props.dispatch(signup({
      username,
      password,
      passwordConfirmation,
    }));
  }

  renderAuthBox() {
    const className = `auth-box animated ${this.state.animate &&
      (this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
    const errors = this.props.auth.errors;
    const {t} = this.props;
    return (
      <div className={className}>
        <center style={{marginBottom: "5px"}}>{t('titleSignUp')}</center>
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              placeholder={t('username')}
              name="username"
              error={t(errors.username)}
              onChange={this.onChange.bind(this)}

            />
            <TextInputGroup
              type="password"
              placeholder={t('password')}
              name="password"
              error={t(errors.password)}
              onChange={this.onChange.bind(this)}
            />
            <TextInputGroup
              type="password"
              placeholder={t('confirm_password')}
              name="passwordConfirmation"
              error={t(errors.passwordConfirmation)}
              onChange={this.onChange.bind(this)}
            />
            <button
              id="sign_up"
              type="submit"
              disabled={this.props.auth.isProcessing}
            >
              {!this.props.auth.isProcessing ? t('register') : t('processing')}
            </button>
          </form>
        </div>
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

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    isProcessing: PropTypes.bool,
  }),
};

export default SignUpPage;


