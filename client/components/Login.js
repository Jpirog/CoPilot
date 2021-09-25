// *** This form replaces part of the AuthForm and is used for the login portion

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../store';

export const Login = props => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [localError, setLocalError] = useState('')


  const handleSubmit = evt => {
    evt.preventDefault();
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.username.value)){
      setLocalError('This email address is not valid');
      evt.target.username.focus();
      return
    }

    const formName = 'login';
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, password, formName)); 
  }

  return (
    <div id="content-wrapper">
    <div id="fb-root"></div>
      <div id="profilecontainer">
        <div className="containerx" id="profileleft">
          <h1 className="profilehdr">Please enter your login credentials</h1>
        </div>
        <div className="containerx" id="profileright">
          <form id="profileform" onSubmit={ handleSubmit }>
            <div className="formfield">
              <input name="username" autoFocus type="text"  required maxLength={ 75 } autoComplete="on"/>
              <label htmlFor="username">Username (email)</label>
            </div>
            <div className="formfield">
              <input name="password" type="password"  required maxLength={ 25 } autoComplete="on" />
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <button type="submit" className="cta">Login</button>
            </div>
            { error && error.response && <div><p>&nbsp;</p> { error.response.data } </div> }
            { localError &&  <div><br /><p> { localError } </p></div> }
          </form>
        </div>
      </div>
    </div>
  )
}
