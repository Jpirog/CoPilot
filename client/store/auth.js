import axios from 'axios';
import history from '../history';
import { getTripsNeedingResponse, updateInvitedTripsWithId  } from "../store/trips";

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method, name) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, name})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    
// added code:    
// user is now authenticated or registered 
// 1) If just signed up, update any tripAttendee rows with this email ID with the user id
// 2) For all, cCheck for trips they were invited to and need a response.
//     if none, redirect to home page 
//     if there are some needing a response, redirect to inviteresponse
// 

    if (method === 'signup'){
        const invitedTrips = await updateInvitedTripsWithId(username, res.data.userId);
    }
// console.log('-----', res.data)
    const trips = await getTripsNeedingResponse(res.data.userId);
    if (trips.length > 0){
      history.push('/inviteresponse');
    } else {
      history.push('/home'); 
    }

  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/') // was login
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
