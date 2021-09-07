import React from 'react'
import {connect} from 'react-redux'
import { Button } from './Button';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div className="home-container">
    <video src="/videos/video-1.mp4" autoPlay loop muted />
      {/* <h3>Welcome, {username}</h3> */}
      <h1> Welcome {username}, to CoPilot App. </h1>
      <p> Now that you are logged in you can create a trip below.</p>
      <p>What are you waiting for?</p>
      <div className="home-btns">
<Button className="btns" buttonStyle="btn--outline"
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
    username: state.auth.username
  }
}

export default connect(mapState)(Home)