import DatePicker from "react-datepicker";
import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"

const Test =()=> {
    const { trip, tripId, tripevents } = useSelector((state) => ({
        trip: state.trips.trip,
        tripId: state.trips.trip.id,
        tripevents: state.trips.trip.tripevents,
      }));

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

  
     useEffect(()=> {
         setStartDate(new Date(`${moment(trip.startDate).format("MM/DD/yyyy")} 4:00 pm`));
         setEndDate(new Date(`${moment(trip.endDate).format("MM/DD/yyyy")} 10:00 am`))
         
     },[trip.startDate,trip.endDate])
    return <>

    <br />  
    <br />  
    <br /> 
    <br />   
    <DatePicker
      placeholderText="CheckIn DateTime"
      timeInputLabel="Pick a Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      withPortal
      dayClassName={(date) => {
        return date >= new Date(trip.startDate) &&
          date <= new Date(trip.endDate)
          ? "highlighted"
          : undefined;
      }}
    />
    <DatePicker
      placeholderText="CheckOut DateTime"
      timeInputLabel="Pick a Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      withPortal
      dayClassName={(date) => {
        return date >= new Date(trip.startDate) &&
          date <= new Date(trip.endDate)
          ? "highlighted"
          : undefined;
      }}
    />
     <br />
     <br />  
    </>
}

export default Test