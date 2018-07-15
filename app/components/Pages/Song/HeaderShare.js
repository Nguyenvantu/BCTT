import React from 'react';
import onClickOutside from 'react-onclickoutside';
import Share from '../../Dropdown/share';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class HeaderShare extends React.PureComponent {

  handleClickOutside = () => {
    if(this.props.showShare)
      this.props.toggleShare(false);
  }

  render() {
    const { t, name, shareUrl, showShare } = this.props;
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="header-share"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={400}
        >
          {showShare &&
            <div className="header-share">
              <Share t={t} name={name} shareUrl={shareUrl} />
            </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
export default onClickOutside(HeaderShare);