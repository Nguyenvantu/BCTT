import * as types from '../constant/action_constant';

const initialState = {
  showAnalyzer: false,
  dropDown: { activeId: '', show: false, where: '' },
  showQueue: false,
  slideInRight: false,
  showModal: false,
  isLoading: false,
  isFading: false,
  downloadProgress: {
    // isDownloading: false,
    // id: '',
    // percent: 0,
  },
};


export default function (state = initialState, action) {
  switch (action.type) {
  case types.SHOW_ANALYZER:
    return { ...state, showAnalyzer: true };

  case types.HIDE_ANALYZER:
    return { ...state, showAnalyzer: false };

  case types.TOGGLE_TRACK_DROPDOWN:
    return toggleTrackDropDown(state, action);

  case types.TOGGLE_QUEUE:
    return { ...state, showQueue: !state.showQueue };

  case types.TOGGLE_MODAL:
    return { ...state, showModal: action.state };

  case types.SLIDE_IN_RIGHT:
    return { ...state, slideInRight: true };

  case types.RESET_SLIDE_IN_RIGHT:
    return { ...state, slideInRight: false };

  case types.START_FADING:
    return { ...state, isFading: true };

  case types.STOP_FADING:
    return { ...state, isFading: false };

  // case types.START_DOWNLOADING:
  //   return {
  //     ...state,
  //     downloadProgress: {
  //       ...state.downloadProgress, [action.id]: action.percent
  //     },
  //   };

  case types.UPDATE_DOWNLOAD_PROGRESS:{
    // let { downloadProgress } = state;
    // delete downloadProgress[action.id]

    return { ...state, downloadProgress: { ...state.downloadProgress, [action.id]: action.percent } };
  }

  // case types.FINISH_DOWNLOADING:{
  //   // let { downloadProgress } = state;
  //   // delete downloadProgress[action.id]

  //   return {
  //     ...state, downloadProgress: { ...state.downloadProgress, [action.id]: -1 }
  //   };
  // }
    

  case types.START_LOADING:
    return { ...state, isLoading: true };

  case types.FINISH_LOADING:
    return { ...state, isLoading: false };

  default:
    return state;
  }
}

function toggleTrackDropDown(state, action) {
  const { activeId, where } = action.dropDown;

  const checkId = activeId !== state.dropDown.activeId;

  return {
    ...state,
    dropDown: {
      where: where !== state.dropDown.where || checkId ? where : '',
      activeId: checkId ? activeId : '',
      show: checkId
    },
  };
}
