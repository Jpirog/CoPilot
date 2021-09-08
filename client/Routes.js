import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import Home from './components/Home';
import SampleCode from './components/SampleCode';
import AddHotel from "./components/AddHotel"
import AddActivity from './components/AddActivity';
import CreateTrip from './components/CreateTrip';
import { AboutUs } from './components/AboutUs';
import {me} from './store'

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
  
          <Route path="/hotel" component={AddHotel} />
          <Route path="/activity" component={AddActivity} />

          <Route path="/samplecode" component={SampleCode} />

          <Route path="/home" component={Home} />
          <Route exact path="/create/trip"><CreateTrip/></Route>
          {/* <Route exact path="/usercreated/:userId"><Trips/></Route> */}
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            {/* <Route path='/' exact component={ Login } /> */}
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/aboutus" component={ AboutUs }><AboutUs /></Route>
            <Redirect to="/aboutus" />
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))