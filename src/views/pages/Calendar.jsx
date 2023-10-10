import React from 'react';
import styled from '@emotion/styled';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEvent from '../components/CreateEvent.jsx';
import { Button, Paper, Grid, FormGroup, Typography, TextField } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar.jsx';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EventDetails from '../components/EventDetails.jsx';

export const StyleWrapper = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 0.95em;  /* Adjust as needed */

  .fc-daygrid-day-frame:hover {
    background: rgba(205, 209, 228, .3);

  }

      --fc-button-bg-color: purple;



      .MuiDialog-paper {
    overflow-y: auto;
}
`

const holidays = [
    '2023-10-12T23:00:00.000Z' 
    // ... add more dates as needed
  ];

function dayCellContentRender(info) {
    // Check if the current day is a holiday
    console.log(info.date);

    const date1 = info.date;
const date2 = new Date("2023-10-12");


    if (date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()) {
        return (
            
          
                        <span style={{ color: 'red' }}>
        {info.dayNumberText}
    </span>
         
            
        );

    } else 
    {
      return(
             <>{info.dayNumberText}</>
    );
    }

    // ... other code or return statements for other conditions
}






    function handleMouseEnter(info) {
    console.log(info);
    // change the day's background color just for fun
    //info.dayEl.style.backgroundColor = 'red';
  }

  function handleMouseLeave(info)
  {
    console.log(info);
    info.dayEl.style.backgroundColor = 'white';
  }

function MyCalendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  function addEvent(newEvent) {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  }

  function deleteEvent(id) {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    console.log("deleting event");
  }

const [eventDetails, setEventDetails] = useState([]);
function handleEventClick(info)
{
  let desc = info.event._def.extendedProps.description;
  let title = info.event._def.title;
  let eventType = info.event._def.extendedProps.eventType;
  let startTime = info.event._instance.range.start;
  let endTime = info.event._instance.range.end;
  let id = info.event._def.publicId;

 let temp = [{desc: desc, title: title, eventType: eventType, startTime: startTime, endTime: endTime, id : id}];

  setEventDetails(temp);
  setOpenEventDetails(true);

}


  const [selectedDates, setSelectedDates] = useState([]);


function handleDateClick(info) {
    const dateStr = info.dateStr;

    // Check if date is already selected
    if (selectedDates.includes(dateStr)) {
        // Remove the date from the selectedDates array
        setSelectedDates(prevDates => prevDates.filter(date => date !== dateStr));
        info.dayEl.style.backgroundColor = 'white';
    } else {
        // Add the date to the selectedDates array
        setSelectedDates(prevDates => [...prevDates, dateStr]);
        info.dayEl.style.backgroundColor = 'rgba(205, 209, 228,1)';
    }
}

  const [open, setOpen] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  function createEventClick(info) {
    console.log(info);
    setOpen(true); // Open the dialog
  }

  function handleDetailClose()
  {
    setOpenEventDetails(false);
  }

  function handleClose() {
    setOpen(false);
  }

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reRender, setReRender] = useState(true); //ez just make a change to a key that forces the component to re mount

  useEffect(() => {
    const fetchHolidays = async () => {
      let allHolidays = [];
      for (let year = 2022; year <= 2031; year++) {
        const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/SE`);
        allHolidays = allHolidays.concat(response.data);
      }
      setHolidays(allHolidays);
      setLoading(false);
    };

    fetchHolidays();
  }, []);


function clearSelectedDates()
{
  setSelectedDates(prevDates => []);
  setReRender(prev => !prev);
}
function toLocalISOString(date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    return date.toISOString().split('T')[0];
}
  function dayCellDidMount(info) {
      const dateStr = toLocalISOString(info.date); // Use the custom function here


        
    // Check if the date is in the selectedDates array
    if (selectedDates.includes(dateStr)) {
      console.log("CHECKING THIS");
      console.log(info);
        info.el.style.backgroundColor = 'rgba(205, 209, 228,1)';
    }


    const holiday = holidays.find(h => h.date === info.date.toISOString().split('T')[0]);
    if (holiday) {
      const holidayNameElement = document.createElement('div');
      console.log("skippiiidioo boop");
        holidayNameElement.innerText = holiday.localName;
        holidayNameElement.innerHTML = holiday.localName.replace(' ', '<br>'); // This will break the text at the first space
        holidayNameElement.style.color = '#ff3333';
        holidayNameElement.style.fontSize = '0.8em'; // Adjust as needed
        holidayNameElement.style.display = 'flex'; // Use flexbox for centering
        holidayNameElement.style.justifyContent = 'center'; // Horizontal centering
        holidayNameElement.style.alignItems = 'center'; // Vertical centering
        holidayNameElement.style.height = '100%'; // Take full height of the parent container
        holidayNameElement.style.width = '100%'; // Take full width of the parent container
        holidayNameElement.style.overflow = 'hidden'; // Hide overflowed text
        holidayNameElement.style.textOverflow = 'ellipsis'; // Display ellipsis for overflowed text
        holidayNameElement.style.whiteSpace = 'nowrap'; // Prevent text from wrapping to the next line
        info.el.querySelector('.fc-daygrid-day-events').appendChild(holidayNameElement);
        const dayNumberElement = info.el.querySelector(".fc-daygrid-day-number");
        dayNumberElement.style.color = '#ff3333';

    }
}




  return (
    <Grid container spacing={0}>
      <ResponsiveAppBar />

      <Grid item xs={12} style={{ height: '20px' }} /> 

      <Grid item xs={0} sm={1} md={2} lg={3}/>

      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper>
<StyleWrapper>
                {loading ? (
                    <Typography>Loading...</Typography>  // Display a loading message or spinner
                ) : (
                    <FullCalendar
                        key={reRender}
                        events={events}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        eventMouseEnter={handleMouseEnter}
                        eventMouseLeave={handleMouseLeave}
                        dayCellDidMount={dayCellDidMount}
                        eventClick={handleEventClick}
                        //dayCellContent={dayCellContentRender}
                        customButtons={{
                            myCustomButton: {
                                text: 'Create Event',
                                click: createEventClick
                            }
                        }}
                        headerToolbar={{
                            left: 'myCustomButton',
                            center: 'title'
                            //right: 'dayGridMonth'
                        }}
                    />
                )}
            </StyleWrapper>
        </Paper>
      </Grid>

      <Grid item xs={0} sm={1} md={2} lg={3}/>
   
         <Dialog open={open} onClose={handleClose}  sx={{overflow: "auto"}}  maxWidth="xl"  // or "lg" or "xl"
    fullWidth={true}>
        <CreateEvent closeDialog={handleClose} addEvent={addEvent} setSelectedDates={setSelectedDates} selectedDates={selectedDates} clearSelectedDates={clearSelectedDates}/>
      </Dialog>

      <Dialog open={openEventDetails} onClose={handleDetailClose}  sx={{overflow: "auto"}}  maxWidth="xl">  
        <EventDetails deleteEvent={deleteEvent} closeDialog={handleClose} eventDetails={eventDetails}/>
        </Dialog>
    </Grid>
  );
}
export default MyCalendar;