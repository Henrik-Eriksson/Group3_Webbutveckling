import React, { useState, useEffect} from "react";
import { Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Grid } from "@mui/material";
import { Tooltip } from "@mui/material";

function CreateEvent({closeDialog, addEvent, setSelectedDates, selectedDates, clearSelectedDates}) {
  const [eventType, setEventType] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('black');
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

const [searchQuery, setSearchQuery] = useState('');
const [filteredUsers, setFilteredUsers] = useState([]);
const [inviteInputValue, setInviteInputValue] = useState('');

  const users = [
  { id: 1, name: 'Henrik', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  { id: 2, name: 'Aron', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  { id: 3, name: 'Johan', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  { id: 4, name: 'Mohammad', avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  { id: 5, name: 'Dog', avatar: 'https://image.petmd.com/files/styles/978x550/public/dog-allergies.jpg' }
];


const [selectedUsers, setSelectedUsers] = useState([]);


const handleInviteInputChange = (e) => {
  const value = e.target.value;
  const mentionedUsers = value.match(/@\w+/g) || [];
  setSelectedUsers(mentionedUsers.map(u => u.slice(1))); // Remove '@' from the beginning

  if (value.includes('@')) {
    const query = value.split('@').pop();
    setSearchQuery(query);
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) && 
      !mentionedUsers.includes(`@${user.name}`)
    );
    setFilteredUsers(filtered);
  } else {
    setSearchQuery('');
    setFilteredUsers([]);
  }
};


const handleUserSelect = (user) => {
  const currentValue = document.getElementById('inviteInput').value;
  const position = currentValue.lastIndexOf(`@${searchQuery}`);
  const newValue = `${currentValue.substring(0, position)}@${user.name} ${currentValue.substring(position + searchQuery.length + 1)}`;
  document.getElementById('inviteInput').value = newValue;
  handleInviteInputChange({ target: { value: newValue } }); // Re-filter the list
};

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
    setFormData({ ...formData, eventType: event.target.value });
  };



    const handleCreateEvent = () => {
    

      let date = new Date(selectedDates[selectedDates.length - 1]);
      date.setDate(date.getDate());
      endDate = date;
       // Check if the event type is "random" and set the background color accordingly
        const validColors = ["black", "red", "blue", "green"];
        const randomColor = validColors[Math.floor(Math.random() * validColors.length)];
        setBackgroundColor(randomColor)

      console.log(formData.startTime);
      
    const newEvent = {
      id: String(Date.now()), // unique id for the event
      title: formData.title, // get this from the form
      start: selectedDates[0], // get this from the form
      end: endDate, // get this from the form
      display: "block",
      displayEventTime: false,
      backgroundColor: randomColor,
      extendedProps: {"description": formData.desc, "eventType": formData.eventType, "startTime" : formData.startTime, "endTime" : formData.endTime}
      //startTime: formData.startTime
      // ... other event details
    };
    const startTimeParts = formData.startTime.split(":");
    const endTimeParts = formData.endTime.split(":");
    const currentDate = new Date();
    const selectedStartDate = new Date(selectedDates[0]);

    const startTime = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth(),
      selectedStartDate.getDate(),
      parseInt(startTimeParts[0], 10),
      parseInt(startTimeParts[1], 10)
    );
  
    const endTime = new Date(
      selectedStartDate.getFullYear(),
      selectedStartDate.getMonth(),
      selectedStartDate.getDate(),
      parseInt(endTimeParts[0], 10),
      parseInt(endTimeParts[1], 10)
    );



    if (selectedStartDate < currentDate) {
      console.log(selectedStartDate);
      alert("Can not book events in the past\n or \nEnd time cannot be before start time.");

      return;
    } 

    // Check if the end date is before the start da
    if (endTime < startTime) {
      alert("End time cannot be before start time.");
      return;
    }
    console.log(endTime.toString());
    console.log(startTime.toString());
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
 <div style={{ position: 'relative' }}>
<Tooltip title="Type '@' to invite friends">
  <TextField 
    id="inviteInput"
    fullWidth 
    margin="normal" 
    label="Invite friends" 
    variant="outlined" 
    onChange={handleInviteInputChange} 
    style={{ backgroundColor: 'white' }} 
  />
</Tooltip>

    <div style={{ 
      position: 'absolute', 
      top: '100%', 
      left: 0, 
      width: '100%', 
      backgroundColor: 'white', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
      zIndex: 2, 
      maxHeight: '150px', 
      overflowY: 'auto' 
    }}>
      {filteredUsers.map(user => (
        <div 
          key={user.id} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px', 
            borderBottom: '1px solid #f0f0f0', 
            cursor: 'pointer' 
          }}
          onClick={() => handleUserSelect(user)}
        >
          <img src={user.avatar} alt={user.name} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
          {user.name}
        </div>
      ))}
    </div>
  </div>
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
