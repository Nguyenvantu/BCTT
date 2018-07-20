// import { isArray } from './utils/func';

export function loadQueueState() {
  try {
    const serializedQueueState = localStorage.getItem('queueState');
    if (!serializedQueueState) return undefined;

    return JSON.parse(serializedQueueState);
  } catch (err) {
    return undefined;
  }
}

export function saveQueueState(queueState) {
  try {
    localStorage.setItem('queueState', JSON.stringify(queueState));
  } catch (err) {
    // ignore
  }
}

export function saveSongDataState(songState) {
  try {
    localStorage.setItem('songDataState', JSON.stringify(songState));
  } catch (err) {
    // ignore
  }
}

export function loadSongDataState() {
  try {
    const serializedSongState = localStorage.getItem('songDataState');
    if (!serializedSongState) return {
      data: {},
      suggestedSongs: [],
      isFetching: false,
      tempData: {}
    }
    const songState = JSON.parse(serializedSongState);
    if(!!songState.data.id) songState.tempData[songState.data.id] = {...songState.data}
    return songState;
  } catch (err) {
    return {
      data: {},
      suggestedSongs: [],
      isFetching: false,
      tempData: {}
    }
  }
}

export function loadUserData() {
  try {
    const serializedUserData = localStorage.getItem('user');
    if (!serializedUserData) return undefined;

    return JSON.parse(serializedUserData);
  } catch (err) {
    return undefined;
  }
}
