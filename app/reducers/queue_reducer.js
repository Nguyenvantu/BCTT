import * as types from '../constant/action_constant';
import { saveQueueState } from './../localStorage';
// import { toast } from 'react-toastify';

const initialState = {
  queue: [],
  ids: [],
  pushRoute: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.ADD_SONG_TO_QUEUE:
    return addSongToQueue(state, action);

  case types.TOGGLE_PUSH_ROUTE:
    return { ...state, pushRoute: action.flag };

  case types.REPLACE_QUEUE:{
    let newState = { ...state, queue: action.songs, ids: action.ids }
    saveQueueState(newState);
    return newState;
  }

  case types.CLEAR_QUEUE:{
    let newState = { ...initialState }
    saveQueueState(newState);
    return newState;
  }

  case types.REMOVE_SONG_FROM_QUEUE:{
    let newState = { ...state, queue: action.songs, ids: action.ids }
    saveQueueState(newState);
    return newState;
  }

  case types.PLAY_USER_PLAYLIST:{
    let newState = { ...state, queue: action.songs, ids: action.ids }
    saveQueueState(newState);
    return newState;
  }

  default:
    return state;
  }
}

function addSongToQueue(state, action) {
  const con = state.ids.find(id => id === action.song.id);
  // only add a song to the queue if this song isn't added before
  if (typeof con === 'undefined') {
    let newState = { queue: [...state.queue, action.song], ids: [...state.ids, action.song.id] }
    saveQueueState(newState);
    return newState;
  }
  // toast(
  //   <div className='custom-toast-content ellipsis'>
  //     <span>{song.name}</span>
  //       đã tồn tại trong danh sách nghe
  //   </div>
  // )
  return state;
}

