import { Card, CardContent, Typography, Button, Divider } from '@mui/material';

function EventDetails({eventDetails, deleteEvent}) {
  console.log(eventDetails.id);
  eventDetails = eventDetails[0];
  function deleteEventBtn() {
  deleteEvent(eventDetails.id);
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">Event Details</Typography>
        <Typography variant="subtitle1">Event Name: {eventDetails.title}</Typography>
        <Typography variant="body1">Date: {eventDetails.startTime.toLocaleDateString()}</Typography>
        <Typography variant="body1">Time: {eventDetails.startTime.toLocaleTimeString()} - {eventDetails.endTime.toLocaleTimeString()}</Typography>
        <Typography variant="body2">EventType: {eventDetails.eventType}</Typography>
        <Typography variant="body2">Description: {eventDetails.desc}</Typography>
        <Button onClick = {deleteEventBtn}>
          Delete Event
        </Button>
      </CardContent>
    </Card>
  );
}
export default EventDetails;