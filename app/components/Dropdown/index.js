import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { isAuthenticated } from '../../HOC';
import { translate } from 'react-i18next';
import Share from './share';
import './index.sass';
import './share.sass';
import { changeAlias } from '../../utils/func';

class DropDown extends React.Component {
  state = { mounted: false };

  handleClickOutside = () => {
    const { id, toggleTrackDropDown } = this.props;
    toggleTrackDropDown(id);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleDropdownAdd() {
    // redirect user to the login page if he is not authenticated
    const { authenticated, user, redirectTo, id, toggleTrackDropDown } = this.props;
    if (!(authenticated && user.username)) {
      // remove the dropdown from the interface
      toggleTrackDropDown(id);
      return redirectTo('/login');
    }

    const { name, artists, toggleModal, thumbnail } = this.props;
    toggleTrackDropDown(id);
    toggleModal();
    this.props.addSongToStoreTemporarily({
      name,
      artists,
      id,
      thumbnail,
    });
  }

  handleDropdownNextUp() {
    const { name, id, thumbnail, toggleTrackDropDown, addSongToQueue, artists } = this.props;
    const songObj = { name, id, thumbnail, artists };
    addSongToQueue(songObj);
    toggleTrackDropDown(id);
  }

  renderDropdown() {
    const { name, id, t } = this.props
    const shareUrl = `${window.location.host}/song/${changeAlias(name)}/${id}`;

    return (
      <div className='dropdown'>
        <div
          className="dropdown-nextup"
          onClick={this.handleDropdownNextUp.bind(this)}
        >
          <img src="/svg/queue-add.svg" alt="" />
          {t('addToNextUp')}
        </div>
        <div
          className="dropdown-add"
          onClick={this.handleDropdownAdd.bind(this)}
        >
          <img
            src="/svg/queue-next.svg"
            style={{ height: '30px', width: '30px', marginRight: '5px' }}
            alt=""
          />
          {t('addToPlaylist')}
        </div>
        <div className="dropdown-share">
          <i className="ion-android-share-alt"></i>
          {/* {this.props.t('share')} */}
          <Share t={t} shareUrl={shareUrl} name={name}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="dropdown"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {this.state.mounted && this.renderDropdown()}
      </ReactCSSTransitionGroup>
    );
  }
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  addSongToQueue: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  addSongToStoreTemporarily: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  redirectTo: PropTypes.func.isRequired,
};

export default translate('homePage')(isAuthenticated(onClickOutside(DropDown)));