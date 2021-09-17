import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../store';
//import { Button } from './Button';
import Dropdown from './Dropdown';
import { getUserCreatedTrips, getUserInvitedTrips, getTripDetails } from '../store/trips';
import { useDispatch } from 'react-redux';
import dateFormat from 'dateformat';


const Navbar = ({handleClick, isLoggedIn, userId, createdTrips, invitedTrips }) => {
  const dispatch = useDispatch();
  const [userTrips, setUserTrips] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      await dispatch(getUserInvitedTrips(userId));
      await dispatch(getUserCreatedTrips(userId));
      setUserTrips(createdTrips.concat(invitedTrips)); // probably not needed
    }
    if (userId){
      fetchData();
    }
  },[userId]);

  const[click, setClick] = useState(false);
  const[button, setButton] = useState(true)
  const [dropdown, setDropdown] = useState(false);

  const fastClick = () =>  setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  useEffect(() => {
    showButton();
    },[])

  window.addEventListener('resize', showButton)

  const handleTripChange = (ev) => {
    dispatch(getTripDetails(ev.target.value));
  }

  return (
  <div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div className="navbar-container">
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="navbar-logo">
            CoPilot
          </Link>
          <div style={{color: 'white'}}>select trip
          <select name="trips" id="navtrips" onChange={handleTripChange}>
          {
            invitedTrips.concat(createdTrips).map((trip, i) => {
              if (i === 0){
                dispatch(getTripDetails(trip.id))
              }
              const fromDate = dateFormat(trip.startDate, "mmm d");
              const toDate = dateFormat(trip.endDate, "mmm d");
              const prefix = trip.ownerId === userId ? 'owner' : 'invitee';
              return (
                <option value={trip.id} key={trip.id}>({prefix}) { trip.destination } ({fromDate}-{toDate}) </option>
              )
            })
          }
          </select>
          </div>
          {/* <a href="#" onClick={handleClick}>
            <i className={'fa fa-sign-out-alt' } />
          </a> */}
          <div className="menu-icon" onClick={fastClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
              Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Restaurants
              </Link>
            </li>
              <li className='nav-item'>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Hotels
            </Link>
              </li>
            <li className='nav-item'>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Tourist Activities
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link to="/editprofile" className="nav-links" onClick={closeMobileMenu}>
              My Profile
              </Link>
            </li> */}
            <li 
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              More <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <Dropdown />}
            </li>
          </ul>
          {/* {button && <Button onClick={handleClick} buttonStyle='btn--outline'><i className={'fa fa-sign-out-alt' } />
</Button>} */}
        </div>
      ) : (
        <div className='navbar-container'>
          {/* The navbar will show these links before you log in */}
          <Link to="/" className="navbar-logo">
            CoPilot
          </Link>
          <div className="menu-icon" onClick={fastClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to="/aboutus" className="nav-links" onClick={closeMobileMenu}>About Us</Link>
            </li>
            <li className='nav-item'>
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>Login</Link>
            </li>
            <li  className='nav-item'>
              <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>Sign Up</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  </div>
  )
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    createdTrips: state.trips.userCreatedTrips,
    invitedTrips: state.trips.userInvitedTrips,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
