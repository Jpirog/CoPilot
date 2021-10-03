// *** This form replaces part of the AuthForm and is used for the register portion

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../store';
import toast from 'react-hot-toast';

const notify = () => toast.success('Registration successful! Welcome to CoPilot!', { duration: 3000, position: 'top-center' })

export const Signup = props => {
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

    if (evt.target.password.value === evt.target.confirmpassword.value){
      const formName = 'signup';
      const username = evt.target.username.value;
      const name = evt.target.username.value || 'NONAME';
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName, name)); 
      dispatch({type: 'INITIALIZE'})
      notify();
    } else {
//      alert ('Passwords do not match - please correct and submit again')
      setLocalError('Passwords do not match - please correct and submit again');
      evt.target.password.value = '';
      evt.target.confirmpassword.value = '';
      evt.target.password.focus();
      setLocalError('');
    }
  }

  return (
    <div id="content-wrapper">
    <div id="fb-root"></div>
      <div id="profilecontainer">
        <div className="containerx" id="profileleft">
          <h1 className="profilehdr">Please enter your information to register</h1>
        </div>
        <div className="containerx" id="profileright">
          <form id="profileform" onSubmit={ handleSubmit }>
            <div className="formfield">
              <input name="username" autoFocus type="email" required maxLength={ 75 } autoComplete="on" />
              <label htmlFor="username">Username (email address)</label>
            </div>
            <div className="formfield">
              <input name="password" type="password"  required maxLength={ 25 } autoComplete="on"/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="formfield">
              <input name="confirmpassword" type="password" required maxLength={ 25 } autoComplete="on"/>
              <label htmlFor="confirmpassword">Confirm password</label>
            </div>
            <div>
              <button type="submit" className="cta">Register!</button>
            </div>
            { error && error.response && <div><br /><p> { error.response.data } </p></div> }
            { localError &&  <div><br /><p> { localError } </p></div> }
          </form>
        </div>
      </div>
    </div>
  )
}
