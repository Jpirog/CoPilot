/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Signup } from './components/SignUp';
import { Login } from './components/Login';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import AddHotel from "./components/AddHotel"
import AddRestaurant from './components/AddRestaurant';
import AddActivity from './components/AddActivity';
import CreateTrip from './components/CreateTrip';
import InviteResponse from './components/InviteResponse';
import TripAttendees from './components/TripAttendees';
import { AboutUs } from './components/AboutUs';
import { me } from './store'

import Calendar from "./components/Calendar";
import Itinerary from './components/Itinerary';
import AllTrips from './components/AllTrips';
import Financials from './components/Financials'


class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>

            <Route exact path="/hotel" component={AddHotel} />
            <Route path="/activity" component={AddActivity} />
            <Route path="/restaurant" component={AddRestaurant} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/home" component={Home} />
            <Route path="/editprofile" component={ EditProfile } />
            <Route path="/inviteresponse" component={ InviteResponse } />
            <Route path="/tripattendees" component={ TripAttendees } />
            <Route exact path="/create/trip" component={ CreateTrip } />
            <Route exact path="/" component={Home} />

            <Route exact path="/itinerary" component={Itinerary} />
            <Route exact path="/allTrips" component={AllTrips}/>
            <Route exact path="/financials" component={Financials} />
            {/* <Route exact path="/usercreated/:userId"><Trips/></Route> */}
            {/*<Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={ Login } />
            <Route path="/signup" component={ Signup } />
            <Route path="/aboutus" component={ AboutUs } />
            <Route path="/" component={ AboutUs } />
            {/*<Redirect to="/aboutus" /> */}
          </Switch>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))