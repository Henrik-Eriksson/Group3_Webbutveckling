import { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
    };
  }

  handleSearchClick = () => {
    console.log('Searching for events on date:', this.state.searchDate);
  };

  render() {
    return (
      <div>
        <Grid container sx={{alignItems: 'center', justifyContent: 'center'}}>

        <Grid xs={0}>
        <TextField
          type="date"
          variant="outlined"
          value={this.state.searchDate}
          onChange={(e) => this.setState({ searchDate: e.target.value })}
        />
        </Grid>
        <Grid xs={0} >
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSearchClick}
            style={{height:"55px", 
                    fontSize: '20px'}}
          > Search
          </Button>
        </Grid>
        </Grid>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>
    );
  }
}
