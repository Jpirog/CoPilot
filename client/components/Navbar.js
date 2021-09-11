import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../store';
import { Button } from './Button';


const Navbar = ({handleClick, isLoggedIn}) => {
  const[click, setClick] = useState(false);
  const[button, setButton] = useState(true)

  const fastClick = () =>  setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  useEffect(() => {
    showButton();
    },[])

  window.addEventListener('resize', showButton)


  return (
  <div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div className="navbar-container">
          {/* The navbar will show these links after you log in */}
          <Link to="/" className="navbar-logo">
            CoPilot
          </Link>
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
            <li className='nav-item'>
              <Link to="/editprofile" className="nav-links" onClick={closeMobileMenu}>
              My Profile
              </Link>
            </li>
          </ul>
          {button && <Button onClick={handleClick} buttonStyle='btn--outline'><i className={'fa fa-sign-out-alt' } />
</Button>}
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
    isLoggedIn: !!state.auth.id
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
