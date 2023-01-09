import { combineReducers } from 'redux'
// why not suffix reducer??
import Trade from './tradeReducer.js';
import User  from './userReducer.js';

// why lower case it?
// why does the guy in the tutorial make it a const then export? is that new or old way?
export default combineReducers({
  trade: Trade,
  user: User,
  settings: {}
});
