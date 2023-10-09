import { Card, CardContent, Typography, Button, Divider } from '@mui/material';

const event = {
  name: ' Event',
  date: '2023-09-30',
  time: '10:00 AM - 12:00 PM',
  location: 'JU',
  description: 'This is a sample event description.',
};

function EventDetails({eventDetails}) {
  console.log(eventDetails);
  eventDetails = eventDetails[0];
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">Event Details</Typography>
        <Typography variant="subtitle1">Event Name: {eventDetails.title}</Typography>
        <Typography variant="body1">Date: {eventDetails.startTime.toLocaleDateString()}</Typography>
        <Typography variant="body1">Time: {eventDetails.startTime.toLocaleTimeString()} - {eventDetails.endTime.toLocaleTimeString()}</Typography>
        <Typography variant="body2">EventType: {eventDetails.eventType}</Typography>
        <Typography variant="body2">Description: {eventDetails.desc}</Typography>
      </CardContent>
    </Card>
  );
}
export default EventDetails;