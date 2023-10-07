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
    };
  }

  handleSearchClick = () => {
    // Handle search logic here
  };

  handleBookingClick = () => {
    // Handle booking logic here
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
            size="large" // Increase the button size
          >
            Book time
          </Button>
        </div>

        <div className='calendar-container'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
          />
        </div>
      </div>
    );
  }
}
