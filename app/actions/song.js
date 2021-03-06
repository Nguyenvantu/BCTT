import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constant/action_constant';
import { ROOT_URL, MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { togglePushRoute, removeSongFromQueue } from './queue';
import { updateDownloadProgress } from './ui';
import React from 'react';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
// import lrcParser from 'lrc-parser';

export function fetchSong(name, id, fetchSuggest = true) {
  return (dispatch, getState) => {
    let state = getState();
    dispatch({ type: types.RESET_SONG_DATA });
    dispatch({ type: types.START_FETCHING_SONG });
    
    if (!!state.songData.tempData[id]) {
      if (fetchSuggest)
        !state.songData.tempData[id].suggested ?
          dispatch(fetchSuggestedSongs({
            songId: id,
            artistId: state.songData.tempData[id].artistId,
          })) : dispatch({
            type: types.FETCH_SUGGESTED_SONG_SUCCESS,
            songs: state.songData.tempData[id].suggested, songId: id
          })

      dispatch(togglePushRoute(false));
      state.queueState.ids.indexOf(id) === -1 &&
        dispatch({
          type: types.ADD_SONG_TO_QUEUE,
          song: { name: state.songData.tempData[id].name, id, artists: state.songData.tempData[id].artists, thumbnail: state.songData.tempData[id].thumbnail },
        });
      dispatch({ type: types.FETCH_SONG_SUCCESS, data: state.songData.tempData[id] });
      state.songData.tempData[id].text_lyrics.length ? 
        dispatch({ type: types.FETCH_TEXT_LYRIC_SUCCESS, data: state.songData.tempData[id].text_lyrics, songId: id })
        :
        dispatch(fetchLyricsSong(id))
    }
    else
      axios.get(`/api/media/song?name=${name}&id=${id}`)
        .then(({ data }) => {
          data.cover = data.artist.cover;
          data.artistId = data.artist.id
          delete data.artist;
          const ids = {
            songId: data.id,
            artistId: data.artistId
          };
          fetchSuggest && dispatch(fetchSuggestedSongs(ids));
          dispatch(fetchLyricsSong(id));
          dispatch(togglePushRoute(false));
          state.queueState.ids.indexOf(id) === -1 &&
            dispatch({
              type: types.ADD_SONG_TO_QUEUE,
              song: { name: data.name, id, artists: data.artists, thumbnail: data.thumbnail },
            });
          dispatch({ type: types.FETCH_SONG_SUCCESS, data });
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: types.FETCH_SONG_FAILURE });
          removeSongFromQueue(id);
          browserHistory.push('/notfound/song');
        });
  };
}

// export function fetchSong(name, id, fetchSuggest = true) {
//   return (dispatch, getState) => {
//     let state = getState();
//     dispatch({ type: types.START_FETCHING_SONG });
//     dispatch({ type: types.RESET_SONG_DATA });

//     if (!!state.songData.tempData[id]) {
//       if (fetchSuggest)
//         !state.songData.tempData[id].suggested ?
//           dispatch(fetchSuggestedSongs({
//             songId: id,
//             artistId: state.songData.tempData[id].artistId,
//           })) : dispatch({
//             type: types.FETCH_SUGGESTED_SONG_SUCCESS,
//             songs: state.songData.tempData[id].suggested, songId: id
//           })

//       dispatch(togglePushRoute(false));
//       state.queueState.ids.indexOf(id) === -1 &&
//         dispatch({
//           type: types.ADD_SONG_TO_QUEUE,
//           song: { name: state.songData.tempData[id].name, id, artists: state.songData.tempData[id].artists, thumbnail: state.songData.tempData[id].thumbnail },
//         });
//       dispatch({ type: types.FETCH_SONG_SUCCESS, data: state.songData.tempData[id] });
//       state.songData.tempData[id].text_lyrics.length ?
//         dispatch({ type: types.FETCH_TEXT_LYRIC_SUCCESS, data: state.songData.tempData[id].text_lyrics, songId: id })
//         :
//         dispatch(fetchLyricsSong(id))
//     }
//     else
//       axios.get(`/api/media/song?name=${name}&id=${id}`)
//         .then(({ data: { url } }) => {
//           axios.get(url)
//             .then(({ data: { data }}) => {
//               if (!data.lyric.trim()) {
//                 data.lyric = [];
//                 data.cover = data.artist.cover;
//                 data.artistId = data.artist.id
//                 delete data.artist;
//                 const ids = {
//                   songId: data.id,
//                   artistId: data.artistId
//                 };
//                 fetchSuggest && dispatch(fetchSuggestedSongs(ids));
//                 dispatch(fetchLyricsSong(id));
//                 dispatch(togglePushRoute(false));
//                 state.queueState.ids.indexOf(id) === -1 &&
//                   dispatch({
//                     type: types.ADD_SONG_TO_QUEUE,
//                     song: { name: data.name, id, artists: data.artists, thumbnail: data.thumbnail },
//                   });
//                 dispatch({ type: types.FETCH_SONG_SUCCESS, data });
//               }
//               else {
//                 axios.get(data.lyric)
//                 .then(({data: lrcFile}) => {
//                   data.lyric = lrcParser(lrcFile).scripts;
//                   data.cover = data.artist.cover;
//                   data.artistId = data.artist.id
//                   delete data.artist;
//                   const ids = {
//                     songId: data.id,
//                     artistId: data.artistId
//                   };
//                   fetchSuggest && dispatch(fetchSuggestedSongs(ids));
//                   dispatch(fetchLyricsSong(id));
//                   dispatch(togglePushRoute(false));
//                   state.queueState.ids.indexOf(id) === -1 &&
//                     dispatch({
//                       type: types.ADD_SONG_TO_QUEUE,
//                       song: { name: data.name, id, artists: data.artists, thumbnail: data.thumbnail },
//                     });
//                   dispatch({ type: types.FETCH_SONG_SUCCESS, data })
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 })
//               }
//             })
//             .catch(err => {
//               console.log(err);
//               dispatch({ type: types.FETCH_SONG_FAILURE });
//               removeSongFromQueue(id);
//               browserHistory.push('/notfound/song');
//             });
//         })
//         .catch(err => {
//           console.log(err);
//           dispatch({ type: types.FETCH_SONG_FAILURE });
//           removeSongFromQueue(id);
//           browserHistory.push('/notfound/song');
//         });
//   };
// }

export function resetSongData() {
  return dispatch => {
    dispatch({ type: types.RESET_SONG_DATA });
  };
}

export function fetchSuggestedSongs({ songId, artistId }) {
  return (dispatch) => {
    axios.get(`${MEDIA_ENDPOINT}/suggested-song?artistId=${artistId}&songId=${songId}`)
      .then(({ data }) => {
        dispatch({
          type: types.FETCH_SUGGESTED_SONG_SUCCESS,
          songs: data.data.items, songId
        })
      })
      .catch(err => dispatch({
        type: types.FETCH_SUGGESTED_SONG_FAILURE,
      }));
  };
}

export function download({ songName, id, filename }) {
  return dispatch => {
    dispatch(updateDownloadProgress(id, 0)); // dispatch the action for showing loading progress bar

    const url = filename ? `${ROOT_URL}/download/song/${songName}/${id}/${filename}` :
      `${ROOT_URL}/download/song/${songName}/${id}`;

    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(updateDownloadProgress(id, percentCompleted));
      },
    })
      .then((response) => {
        // const blob = new Blob([response.data], { type: 'audio/mpeg' });
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = `${songName}.mp3`;
        // link.click();
        FileSaver.saveAs(new Blob([response.data], { type: 'audio/mpeg' }), `${songName}.mp3`);
        setTimeout(() => dispatch(updateDownloadProgress(id, -1)), 1000)
      })
      .catch(err => {
        dispatch(updateDownloadProgress(id, -1)); 
        toast.error(
          <div className="custom-toast-content">Không thể tải <span>{songName}</span>, có lỗi xảy ra!"</div>
        )
        throw err;     
      });
  };
}

export function fetchLyricsSong(songId) {
  return (dispatch) => {
    axios.get(`https://mp3.zing.vn/xhr/lyrics/get-lyrics?media_id=${songId}`)
      .then(({data}) => {
        dispatch({
          type: types.FETCH_TEXT_LYRIC_SUCCESS,
          data: data.data ? data.data : [], songId
        })
      })
      .catch(err => dispatch({
        type: types.FETCH_TEXT_LYRIC_FAILURE, songId
      }));
  };
}

