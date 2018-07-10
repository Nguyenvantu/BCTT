import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import TopResult from './TopResult';
import SongResult from './SongResult';
import AlbumResult from './AlbumResult';
import ArtistResult from './ArtistResult';
import './index.sass';

class SearchMenu extends Component {
  handleClickOutside = () => {
    this.props.clearSearchResult();
  }

  render() {
    const { top, data } = this.props.searchResult;
    if (!data) return null;
    const { t } = this.props;
    return (
      <ul className='search-menu'>
        { top && <TopResult {...top} clearSearchResult={this.props.clearSearchResult}/> }
        <SongResult songs={data.song || []} clearSearchResult={this.props.clearSearchResult} t={t} />
        <ArtistResult artists={data.artist || []} clearSearchResult={this.props.clearSearchResult} t={t} />
        <AlbumResult albums={data.album || []} clearSearchResult={this.props.clearSearchResult} t={t} />
      </ul>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.object.isRequired,
  clearSearchResult: PropTypes.func.isRequired,
};

export default translate('nav')(onClickOutside(SearchMenu));
