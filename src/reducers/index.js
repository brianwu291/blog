import { combineReducers } from 'redux';
import postReducer from './postReducer.js';
import usersReducer from './usersReducer.js';

export default combineReducers({
    posts: postReducer,
    users: usersReducer
});