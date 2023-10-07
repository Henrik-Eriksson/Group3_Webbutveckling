import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Calendar.css';

export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
      selectedDate: null,
      calendarEvents: [],
    };
    this.calendarRef = React.createRef(); // Create a ref for the FullCalendar component
  }

  handleSearchClick = () => {
    const { searchDate } = this.state;
    if (searchDate) {
      // Update the selectedDate state
      this.setState({ selectedDate: searchDate }, () => {
        // Use the FullCalendar ref to change the displayed date
        if (this.calendarRef.current) {
          this.calendarRef.current.getApi().gotoDate(searchDate);
        }
        // Add an event to highlight the selected date
        this.addSelectedDateEvent(searchDate);
      });
    } else {
      alert('Please enter a date before searching.');
    }
  };

  handleBookingClick = () => {
    if (this.state.selectedDate) {
      alert(`Booked time on ${this.state.selectedDate}`);
    } else {
      alert('Please select a date before booking.');
    }
  };

  // Add an event to highlight the selected date
  addSelectedDateEvent = (date) => {
    const { calendarEvents } = this.state;

    // Remove any existing selected date event
    const filteredEvents = calendarEvents.filter((event) => event.className !== 'selected-date');

    // Add the new selected date event
    filteredEvents.push({
      title: 'Selected Day',
      start: date,
      className: 'selected-date',
    });

    this.setState({ calendarEvents: filteredEvents });
  };

  render() {
    return (
      <div className='container'>
        <TextField
          className='date-input'
          type="date"
          variant="outlined"
          value={this.state.searchDate}
          onChange={(e) => this.setState({ searchDate: e.target.value })}
        />
        <Button
          className='button'
          variant="contained"
          color="primary"
          onClick={this.handleSearchClick}
        >
          Search
        </Button>

        <div className='booking-button-container'>
          <Button
            className='booking-button'
            variant="contained"
            color="secondary"
            onClick={this.handleBookingClick}
            size="large"
          >
            Book time
          </Button>
        </div>

        <div className='calendar-container'>
          <FullCalendar
            ref={this.calendarRef} // Assign the ref to the FullCalendar component
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={this.state.calendarEvents} // Pass the events array to FullCalendar
          />
        </div>
      </div>
    );
  }
}
