
import React from 'react'
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import {connect} from 'react-redux'




//DnD Calendar
const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      defaultDate:new Date(),
      displayDragItemInCell: true,
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

componentDidUpdate(prevProps){
    if(!prevProps.eventList){
    this.setState({events:this.props.eventList,defaultDate:this.props.trip.startDate})
}
}
  handleDragStart = event => {
    this.setState({ draggedEvent: event })
  }

  dragFromOutsideItem = () => {
    return this.state.draggedEvent
  }

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = this.state

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }

    this.setState({ draggedEvent: null })
    this.moveEvent({ event, start, end })
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(_event) {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }

  render() {
    return (
      <DragAndDropCalendar
        selectable
        onSelectEvent={(event)=>{
            alert(`${event.location},${event.start},${event.end}`)

        }}
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        defaultDate={this.state.defaultDate}
        popup={true}
        dragFromOutsideItem={
          this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
        }
        onDropFromOutside={this.onDropFromOutside}
        handleDragStart={this.handleDragStart}
        style={{height:1000,paddingTop:"10%"}}
   
      />
    )
  }
}

const mapState =(state)=>({
trip:state.trips.trip,
eventList:state.trips.trip.tripevents&&state.trips.trip.tripevents.map(event=>({id:event.id,title:event.placeName,start:new Date(event.startDate),end:new Date(event.endDate),desc:event.description,location:event.location}))
})


export default connect(mapState,null)(Dnd)

