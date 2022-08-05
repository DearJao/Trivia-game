import { combineReducers } from 'redux';
import userReducer from './user';
// import apiReducer from './api';

const rootReducer = combineReducers({
  player: userReducer,
  // api: apiReducer,
});

export default rootReducer;
