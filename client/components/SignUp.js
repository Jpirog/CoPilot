// *** This form replaces part of the AuthForm and is used for the register portion

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../store';
import toast from 'react-hot-toast';

const notify = () => toast.success('Registration successful! Welcome to CoPilot!', { duration: 3000, position: 'top-center' })

export const Signup = props => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = evt => {
    evt.preventDefault()
    if (evt.target.password.value === evt.target.confirmpassword.value){
      const formName = 'signup';
      const username = evt.target.username.value;
      const name = evt.target.username.value || 'NONAME';
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName, name)); 
      notify();
    } else {
      alert ('Passwords do not match - please correct and submit again')
      evt.target.password.value = '';
      evt.target.confirmpassword.value = '';
      evt.target.password.focus();
    }
  }

  return (
    <div id="content-wrapper">
      <div id="profilecontainer">
        <div className="container" id="profileleft">
          <h2 className="profilehdr">Please enter your information to register</h2>
        </div>
        <div className="container" id="profileright">
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
            { error && error.response && <div> { error.response.data } </div> }
          </form>
        </div>
      </div>
    </div>
  )
}
