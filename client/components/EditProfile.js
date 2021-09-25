import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../store/user";
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { me } from '../store';

const notify = () => toast.success('Your profile has been updated', { duration: 3000, position: 'top-center' })

const EditProfile = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const [dispName, setDispName] = useState("");
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [user, setUser] = useState({});
  const [enableSave, setenableSave] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      const userData = await getUser(userId);
      setusername(userData.username);
      setname(userData.name);
      setUser(userData);
      setDispName(userData.name);
    }
    fetchData();
  },[] );
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newUser = user;
    newUser.name = name;
    updateUser(newUser);
    dispatch(me());
    notify();
    history.push('/home');
  }

  if (name === ''){
    return null;
  }

  return (
      <div id="content-wrapper">
        <div id="fb-root"></div>
          <div id="profilecontainer">
            <div className="containerx" id="profileleft">
              <h1 className="profilehdr">Update Your Profile</h1>
            </div>
            <div className="containerx" id="profileright">
              <form id="profileform">
                <h2>{ dispName }</h2>
                <br />
                <div className="formfield">
                  <input
                    type="text"
                    name="username"
                    disabled
                    value={ username }
                  />
                  <label>Email</label>
                </div>
              <div className="formfield">
                <input
                  type="text"
                  name="name"
                  autoFocus
                  required
                  maxLength="75"
                  onChange={(ev) => {
                    setname(ev.target.value);
                    setenableSave(true);
                  }}
                  value={ name } 
                />
                <label>Name (*)</label>
              </div>
              <div className="formfield">
                <span>(*) - required field</span>
                <button className={!enableSave ? 'ctadisabled' : 'cta'} disabled={!enableSave}
                  onClick={ handleSubmit }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default EditProfile;
