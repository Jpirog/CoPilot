import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import auth from './auth';
import trips from './trips';
import tripattendees from './tripattendees';
import tripevents from './tripevents';

const reducer = combineReducers({ auth, trips, tripattendees, tripevents });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
