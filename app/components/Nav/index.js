import React from 'react';
import { Link, IndexLink } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import SearchMenu from '../SearchMenu';
import { logout } from '../../actions/auth';
import { clearUserPlaylist } from '../../actions/user_playlist';
import { translate } from 'react-i18next';
import './nav.sass';
import './language.sass';

class Nav extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.state = { term: '', searchResult: {} };
    this.debounceSearch = debounce(this.search, 300);
  }

  search(term) {
    axios.get(`/api/media/search?term=${term}`)
      .then(({ data }) => {
        if (this.state.term.length) {
          this.setState({ searchResult: data });
        }
      })
      .catch(err => { throw err; });
  }

  handleOnChange(e) {
    let term = e.target.value;
    if (!term) return this.setState({ term: '' });
    this.setState({ term });
    term = term.replace(/\s+/g, '+');
    return this.debounceSearch(term);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchResult.result && !nextState.term.length) {
      this.setState({ searchResult: {} });
    }
  }

  clearSearchResult() {
    this.setState({ term: '', searchResult: {} });
  }

  handleChangeLanguage = (code) => {
    let { i18n } = this.props;
    i18n.changeLanguage(code);
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearUserPlaylist());
    this.props.dispatch(logout());
    this.context.router.push('/');
  }

  render() {
    const { t, auth:{ authenticated, user} } = this.props;

    return (
      <nav>
        <div className="logo">
          <Link to="/">
            MP3
          </Link>
        </div>
        <div className="searchBar">
          <div className="search-wrapper">
            <i className="ion-search"></i>
            <input
              type="text"
              placeholder={t('search') + "..."}
              value={this.state.term}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          { this.state.searchResult.result &&
            <SearchMenu
              searchResult={this.state.searchResult}
              clearSearchResult={this.clearSearchResult.bind(this)}
            />
          }
        </div>
        <div className="navRight">
          <ul className="nav-menu">
            <li>
              <IndexLink to="/" className="animating_link" activeClassName="nav-menu-link-active">
                {t('home')}
              </IndexLink>
            </li>
            <li>
              <Link to="/charts" className="animating_link" activeClassName="nav-menu-link-active">
                {t('chart')}
              </Link>
            </li>
            <li>
              <Link to="/albums" className="animating_link" activeClassName="nav-menu-link-active">
                {t('albums')}
              </Link>
            </li>
            <li>
              <Link to="/artists" className="animating_link" activeClassName="nav-menu-link-active">
                {t('artists')}
              </Link>
            </li>
          </ul>
        </div>
        {
          !authenticated
          ? <div className="auth-btns">
            <Link to="/login" className="animating_link" activeClassName="nav-menu-link-active">
              <img src="/svg/login.svg" />
              &nbsp;{t('signIn')}
            </Link>
            <Link to="/signup" className="animating_link" activeClassName="nav-menu-link-active">
              {t('register')}
            </Link>
            <Language handleChangeLanguage={this.handleChangeLanguage} t={t}/>
          </div>
          : <div className="user">
            <Link to={`/user/${user.username}`} className="animating_link ellipsis" activeClassName="nav-menu-link-active">
              {user.username}
            </Link>
            <a href="#" title={t('signOut')} onClick={this.logOut.bind(this)} className="animating_link">
              <img src="/svg/sign-out-option.svg" />
            </a>
            <Language handleChangeLanguage={this.handleChangeLanguage} t={t}/>
          </div>
        }
        
      </nav>
    );
  }
}

Nav.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default translate('nav')(Nav);

const Language = ({ handleChangeLanguage, t }) => 
  <div className="animating_link dropdown-lang">
    <div className="dropbtn">{t('lang')}&nbsp;<i className="ion-chevron-down"></i></div>
    <div className="dropdown-lang-content">
      <div className="dropdown-lang-item" onClick={() => handleChangeLanguage('en')}>English</div>
      <div className="dropdown-lang-item" onClick={() => handleChangeLanguage('vi')}>Việt Nam</div>
    </div>
  </div>
