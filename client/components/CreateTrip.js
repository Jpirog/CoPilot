import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  createTrip   from '../store/trips'

const initialState = {
    destination: '',
    startDate: '',
    endDate: '',
    purpose: ''
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
        await this.props.createTrip({
             destination: state.destination,
            startDate: state.startDate,
            endDate: state.endDate,
            purpose: state.purpose
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
    const { destination, startDate, endDate, purpose} = this.state
    return ( 
    <div className="materialboxed center form">
        <div className="materialboxed center">
            <h1>Add Trip</h1>
            <form className='input-field col s6' onSubmit={handleSubmit}>
            <div className='input-field col s6'>
                    <div>Destination:</div>
                    <input type="text" name='destination' value= {destination} onChange={ handleChange }
                    required={true} />
                </div>
                <div className='input-field col s6'>
                    <div>Start Date:</div>
                    <input type="date" name='startDate' value= {startDate} onChange={ handleChange }
                    required={true} />
                </div>

                <div className='input-field col s6'>
                    <div>End Date:</div>
                    <input type="date" name='endDate' value= {endDate} onChange={ handleChange }
                    required={true}/>
                </div>
                <div className='input-field col s6'>
                    <div>Purpose:</div>
                    <input type="enum" name='purpose' value= {purpose} onChange={ handleChange }
                    required={true}/>
                </div>
                <button type="submit" className="">Create</button>
                <Link to="/"><button>Back to Homepage</button></Link>
            </form>
        </div>
    </div>
     );
}
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
    createTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);