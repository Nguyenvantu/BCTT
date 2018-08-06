import * as types from '../constant/action_constant';
import { saveSongDataState } from './../localStorage';

const initialState = {
  data: {},
  suggestedSongs: [],
  isFetching: false,
  tempData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.RESET_SONG_DATA:{
    const newState = {...state, data: {}}
    saveSongDataState({ ...newState, tempData: {} });
    return newState;
  }
    
  case types.FETCH_SONG_SUCCESS:{
    const newState = { ...state, data: {...state.data, ...action.data}, isFetching: false, 
      tempData: { ...state.tempData, [action.data.id]: { ...state.tempData[action.data.id], ...action.data} } };
    saveSongDataState({...newState, tempData: {}});
    return newState;
  }

  case types.FETCH_SUGGESTED_SONG_SUCCESS:{
    const newState = { ...state, suggestedSongs: action.songs, 
      tempData: { ...state.tempData, [action.songId]: { ...state.tempData[action.songId], suggested: [...action.songs]} } };
    saveSongDataState({...newState, tempData: {}});
    return newState;
  }

  case types.FETCH_TEXT_LYRIC_SUCCESS:{
    const newState = { 
      ...state, 
      data: {...state.data, text_lyrics: action.data},
      tempData: { ...state.tempData, [action.songId]: { ...state.tempData[action.songId], text_lyrics: action.data} }
    };
    saveSongDataState({...newState, tempData: {}});
    return newState;
  }

  case types.FETCH_TEXT_LYRIC_FAILURE:{
    const newState = { 
      ...state, 
      data: {...state.data, text_lyrics: []} 
    };
    saveSongDataState({...newState, tempData: {}});
    return newState;
  }

  case types.START_FETCHING_SONG:
    return { ...state, isFetching: true };

  case types.FETCH_SONG_FAILURE:
    return { ...state, isFetching: false };

  default:
    return state;
  }
}
