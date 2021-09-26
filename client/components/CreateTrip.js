import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import  { addUpdateTrip }  from '../store/trips'
// import TripMap from './TripMap'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  import DatePicker from 'react-datepicker';
  import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    name: '',
    purpose: 'VACATION',
}
class CreateTrip extends Component{
  constructor(props){
    super(props)
    this.state = {
        initialState,
        address: '',
        startDate: new Date(),
        endDate: new Date()
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDate = this.handleDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);


  }


  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {state} = this
    try {
        await this.props.addUpdateTrip({
            destination: state.address,
            startDate: state.startDate,
            endDate: state.endDate,
            purpose: state.purpose,
            name: state.name,
            ownerId:this.props.auth.id,
        })
        console.log(this.props)

    this.props.history.push('/tripattendees')

    } catch (error) {
        console.log(error)
    }
}
handleChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change)
}

handleChanges = address => {
    this.setState({ address });
  };

handleDate = start => {
    this.setState({
        startDate: start
      })

    }

      handleEndDate = end => {
        this.setState({
            startDate: end
          })

        }    

onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
    console.log(this.state.endDate)
  }
 
  handleSelect = address => {
      console.log(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({ address })
      })
      .catch(error => console.error('Error', error));
  };


render() {
    const { handleSubmit, handleChange, handleChanges, handleSelect } = this;
    const { destination, startDate, endDate, purpose, name} = this.state
    return ( 
    <div id="content-wrapper">
    <div id="fb-root"></div>
        <div id="profilecontainer">
        <div className="containerx" id="profileleft">
            <h1 className="profilehdr">Create Trip</h1>
            </div>
            <div className="containerx" id="profileright">
            <form id="profileform" onSubmit={handleSubmit}>
            <div className='formfield'>
                
                <input type="text" name='name' value= {name} onChange={ handleChange }
                required={true} />
                <label>Name:</label>
            </div>
            <div className='formfield'>
                    {/* <input type="text" name='destination' value= {destination} onChange={ handleChange }
                    required={true} /> */}
                    <PlacesAutocomplete
        
        value={this.state.address}
        onChange={handleChanges}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='formfield'>
            <input 
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            //   name='destination'
            //   onChange={handleChanges}
               className='formfield'
              value= { this.state.address }
            />
                            <label>Destination:</label>

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
                    
                </div>
                <div className='formfield'> 
                    {/* <input type="date" name='startDate' value= {startDate} onChange={ handleChange }
                    required={true} /> */}
                    <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleDate }
              name="startDate"
              dateFormat="MM/dd/yyyy"
          />
                    {/* <label>Start Date:</label> */}
                </div>
                {/* <div className='formfield'> */}
                    {/* <input type="date" name='endDate' value= {endDate} onChange={ handleChange }
                    required={true}/> */}
                     {/* <label>End Date:</label> */}
                     {/* <DatePicker
              selected={ this.state.endDate }
              onChange={ this.handleEndDate }
              name="endDate"
              dateFormat="MM/dd/yyyy"
          />
                </div> */}
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
                <button type="submit" className="" onChange={ handleSubmit }>Submit Trip</button>
                <br/>
                {/* <Link to="/tripattendees"><button>Add Trip Attendeese</button></Link> */}
                </div>
            </form>
            </div>
            <br/>
        </div>
        {/* <TripMap /> */}
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