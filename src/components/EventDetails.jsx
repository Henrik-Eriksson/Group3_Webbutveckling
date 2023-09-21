import React from 'react';
import { Card, CardContent, Typography, Button, Divider } from '@mui/material';

const event = {
  name: ' Event',
  date: '2023-09-30',
  time: '10:00 AM - 12:00 PM',
  location: 'JU',
  description: 'This is a sample event description.',
};

function EventDetails() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Event Details
        </Typography>
        <Divider />
        <Typography variant="subtitle1">Event Name: {event.name}</Typography>
        <Typography variant="body1">Date: {event.date}</Typography>
        <Typography variant="body1">Time: {event.time}</Typography>
        <Typography variant="body1">Location: {event.location}</Typography>
        <Typography variant="body2">Description: {event.description}</Typography>
      </CardContent>
      <Button variant="contained" color="primary">
        Register
      </Button>
    </Card>
  );
}

export default EventDetails;
