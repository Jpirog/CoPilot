import React from 'react'
import {connect} from 'react-redux'
import { Button } from './Button';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

/**
 * COMPONENT
 */
 const Home = props => {
  const { username, name } = props

  return (
    <div className="home-container">
      <Toaster />
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      {/* <h3>Welcome, {username}</h3> */}
      <h1> Welcome { name } to CoPilot </h1>
      <p> Now that you are logged in, create a trip below!</p>
      <p>What are you waiting for?</p>
      <div className="home-btns">
        <Button style={{backgroundColor: 'pink'}} className="btns" buttonStyle="btn--outline"
        buttonSize="btn--large"><Link to="/create/trip" color="red">CREATE A TRIP</Link></Button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    name: state.auth.name,
  }
}

export default connect(mapState)(Home)

// <p style={{fontSize: '15px'}}>or continue on from your last visit -- <Link to="/" style={{color: 'black'}}><u>click here</u></Link></p>
