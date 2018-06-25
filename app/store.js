import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadSongDataState, loadQueueState, loadUserData } from './localStorage';

let middleware = [thunk];
// apply logger middleware in the development environment

if (process.env.NODE_ENV !== 'production') {
  // const logger = require('./logger').default;

  middleware = [...middleware /*, logger*/ ];
}

const queueFromLocalStorage = loadQueueState();

const persistedData = {
  songData: loadSongDataState(),
  queueState: queueFromLocalStorage,
  auth: {
    authenticated: Boolean(loadUserData()),
    user: loadUserData(),
    errors: {},
  },
};
const store = createStore(rootReducer, persistedData, applyMiddleware(...middleware));

// store.subscribe(_throttle(() => {
//   saveQueueState(store.getState().queueState);
// }, 1000 * 60 * 5));
// save songs in queue to the localStorage every 5 minutes

export default store;
