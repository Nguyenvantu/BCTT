import axios from 'axios';
import * as types from '../constant/action_constant';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { startLoading, finishLoading } from './ui';
import { browserHistory } from 'react-router';

export function clearAlbums() {
  return {
    type: types.CLEAR_ALBUMS,
  };
}

export function setNumberOfPages(numberOfPages) {
  return {
    type: types.SET_NUMBER_OF_PAGES,
    numberOfPages,
  };
}

export function changePageChunkIndex(pageChunkIndex) {
  return {
    type: types.CHANGE_PAGE_CHUNK_INDEX,
    pageChunkIndex,
  };
}

export function fetchDefaultAlbums() {
  return dispatch => {
    dispatch(startLoading());

    axios.get(`${MEDIA_ENDPOINT}/album/default`)
      .then(({ data }) => {
        if (data.result && data.origins.length) {
          dispatch({ type: types.FETCH_DEFAULT_ALBUMS, defaultAlbums: data.origins });

          dispatch(clearAlbums()); // clear the albums data
          dispatch(finishLoading());
        }
      })
      .catch(err => {
        dispatch(finishLoading());
        browserHistory.push('/notfound/albums');
        throw err;
      });
  };
}

export function fetchAlbums(genre, id, page) {
  const pageQuery = page ? `&page=${page}` : '';
  return dispatch => {
    dispatch(startLoading());

    axios.get(`${MEDIA_ENDPOINT}/albums?genre=${genre}&id=${id}${pageQuery}`)
      .then(({ data }) => {
        if (data.albums && data.albums.length) {
          dispatch({ type: types.FETCH_ALBUMS, albums: data.albums });
          dispatch(setNumberOfPages(data.numberOfPages));
          dispatch(finishLoading());
        }
      })
      .catch(err => { dispatch(finishLoading()); throw err; });
  };
}

export function fetchSuggestedAlbums(id, artistId) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/suggested-album?id=${id}&artistId=${artistId}`)
      .then(({ data }) => {
        dispatch({type: types.FETCH_SUGGESTED_ALBUMS, data: data.data.items})
      })
      .catch(err => { throw err; });
  };
}

export function fetchAlbumPlaylist(title, id) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/album_playlist?title=${title}&id=${id}`)
      .then(({ data }) => {
        const artistId = data.songs[0] && data.songs[0].artist && data.songs[0].artist.id;
        dispatch(fetchSuggestedAlbums(id, artistId));
        dispatch({ type: types.FETCH_ALBUM_PLAYLIST, playlist: data });
      })
      .catch(err => {browserHistory.push('/notfound/album'); throw err; });
  };
}

export function clearPlaylist() {
  return { type: types.CLEAR_PLAYLIST };
}

