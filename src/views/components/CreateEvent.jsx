import React, { useState, useEffect} from "react";
import { Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Grid } from "@mui/material";

function CreateEvent({closeDialog, addEvent, setSelectedDates, selectedDates, clearSelectedDates}) {
  const [eventType, setEventType] = useState('');
  let endDate = null;


  useEffect(() => {
   // console.log(selectedDates);
    let date = new Date(selectedDates[selectedDates.length - 1]);
    date.setDate(date.getDate());
    endDate = date;
    console.log(endDate);
}, [selectedDates]);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    startTime: '',
    endTime: ''
  });

  const menuItems = [
    "Business Meeting",
    "Social Event",
    "Educational Event",
    "Entertainment Event",
    "Sporting Event",
    "Networking Event",
    "Food and Drink Event",
    "Charity or Fundraising Event",
    "Outdoor Adventure",
    "Gaming Event",
    "Other"
  ];

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };



    const handleCreateEvent = () => {
      let date = new Date(selectedDates[selectedDates.length - 1]);
      date.setDate(date.getDate());
      endDate = date;
      
      console.log(formData.startTime);
    const newEvent = {
      id: String(Date.now()), // unique id for the event
      title: formData.title, // get this from the form
      start: selectedDates[0], // get this from the form
      end: endDate, // get this from the form
      display: "block",
      backgroundColor: "black",
      //startTime: formData.startTime
      // ... other event details
    };

    //TODO: add to DB and retrieve
    addEvent(newEvent);
    
    clearSelectedDates();
    closeDialog();
  };



  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/kissekatt.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Paper style={{ padding: '20px', width: '80%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.0)', boxShadow: 'none' }}>
        <TextField fullWidth margin="normal" label="Event Name" variant="outlined" onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ backgroundColor: 'white' }} />
        <TextField fullWidth margin="normal" label="Event Description" onChange={(e) => setFormData({ ...formData, desc: e.target.value })} variant="outlined" style={{ backgroundColor: 'white' }} />
        <TextField fullWidth margin="normal" label="Invite friends" variant="outlined" style={{ backgroundColor: 'white' }} />
        <TextField fullWidth margin="normal" label="     Start Time" type="time" onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} variant="outlined" style={{ backgroundColor: 'white' }} />
        <TextField fullWidth margin="normal" label="     End Time" type="time" onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} variant="outlined" style={{ backgroundColor: 'white' }}  />
        <FormControl fullWidth variant="outlined" margin="normal" style={{ backgroundColor: 'white' }}>
          <InputLabel>Event Type</InputLabel>
          <Select
            value={eventType}
            onChange={handleEventTypeChange}
            label="Event Type"
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleCreateEvent} style={{ marginTop: '20px' }}>
          Create Event
        </Button>
      </Paper>
    </div>
  );
}

export default CreateEvent;
