import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

class Choices extends Component {
  state = { showMenu: false };

  handleClickOutside = () => {
    this.setState({ showMenu: false });
  }

  toggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  handleOnClick(id) {
    if (id === this.props.activeChoiceId) {
      return;
    }

    this.props.fetchTracks(1, id);
  }

  render() {
    const { activeChoiceId, t } = this.props;
    const datas = {
      'ZWZB96AB': t('popularUsUk'),
      'ZWZB96DC': t('popularKr'),
      'ZWZB969E': t('popularVn'),
    };
    return (
      <div
        className={`choice ${this.state.showMenu ? 'choice-active' : ''}`}
        onClick={this.toggle.bind(this)}
      >
        <span className="choice-content">{datas[activeChoiceId] || Object.values(datas)[0]}</span>
        <i className="ion-chevron-down"></i>
        {
          this.state.showMenu &&
          <ul className="choice-list">
            {
              Object.keys(datas).map(key =>
                <li key={key} onClick={this.handleOnClick.bind(this, key)}>{datas[key]}</li>
              )
            }
          </ul>
        }
      </div>
    );
  }
}

Choices.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
  activeChoiceId: PropTypes.string,
  t: PropTypes.func
};

export default onClickOutside(Choices);
