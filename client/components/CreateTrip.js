import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  { addUpdateTrip }  from '../store/trips'
import TripMap from "./TripMap";

const initialState = {
    destination: '',
    startDate: '',
    endDate: '',
    name: '',
    purpose: 'VACATION',
}
class CreateTrip extends Component{
  constructor(props){
    super(props)
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {state} = this
    try {
        await this.props.addUpdateTrip({
             destination: state.destination,
            startDate: state.startDate,
            endDate: state.endDate,
            purpose: state.purpose,
            name: state.name,
            ownerId:this.props.auth.id,
        })
    this.setState(initialState)
    } catch (error) {
        console.log(error)
    }
}
handleChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change)
}

render() {
    const { handleSubmit, handleChange } = this;
    const { destination, startDate, endDate, purpose, name} = this.state
    return ( 
    <div id="content-wrapper">
    <div id="fb-root"></div>
        <div id="profilecontainer">
        <div className="container" id="profileleft">
            <h1 className="profilehdr">Add Trip</h1>
            </div>
            <div className="container" id="profileright">
            <form id="profileform" onSubmit={handleSubmit}>
            <div className='formfield'>
                
                <input type="text" name='name' value= {name} onChange={ handleChange }
                required={true} />
                <label>Name:</label>
            </div>
            <div className='formfield'>
                
                    <input type="text" name='destination' value= {destination} onChange={ handleChange }
                    required={true} />
                    <label>Destination:</label>
                </div>
                <div className='formfield'>
                    
                    <input type="date" name='startDate' value= {startDate} onChange={ handleChange }
                    required={true} />
                    <label>Start Date:</label>
                </div>

                <div className='formfield'>
                   
                    <input type="date" name='endDate' value= {endDate} onChange={ handleChange }
                    required={true}/>
                     <label>End Date:</label>
                </div>
                <div className='formfield'>
                    <select name='purpose' value= {purpose} onChange={ handleChange }>
                       <option value="VACATION">Vacation</option>
                     <option value="BUSINESS">Business</option>
                    <option value="REUNION">Reunion</option>
                     <option value="RELAX">Relax</option>
                     <option value="OTHER">Other</option>
                    </select>
                    <label>Purpose:</label>
                </div>
                <div className="buttons">
                <button type="submit" className="">Submit Trip</button>
                <br/>
                <Link to="/tripattendees"><button>Add Trip Attendeese</button></Link>
                </div>
            </form>
            </div>
            <br/>
            <TripMap  />
        </div>
    </div>
     );
}
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
    addUpdateTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);