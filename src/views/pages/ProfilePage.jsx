import { useState, useEffect } from 'react';
import { Typography, Avatar, Grid, Paper, Box, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";
import { authenticate } from '../../app.jsx'; // Assuming you have this function in app.jsx

const ProfileCard = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 2, backgroundColor: '#FFFFFF' }}>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    {children}
  </Paper>
);

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    eventcount: '',
    profilePicture: 'https://via.placeholder.com/150' // default image
  });

  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await authenticate();

        // Fetch user details
        const userResponse = await fetch(`http://localhost:5050/api/users/${userId}`);
        const userData = await userResponse.json();

        // Fetch user events
        const eventResponse = await fetch(`http://localhost:5050/api/users/getEvents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const events = await eventResponse.json();

        setUserData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profilePicture || sampleUserData.profilePicture
        });

        setEventCount(events.length);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(./src/assets/xd.png)`,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
      <Box display="flex" alignItems="center">
        <Avatar 
            alt="User Profile Picture" 
            src={userData.profilePicture} 
            sx={{ width: 150, height: 150, mb: 3, ml: 3 }}
        />

        <Typography variant="h2" sx={{color: "white", p: 3}} gutterBottom>
          {userData.firstName} {userData.lastName}
        </Typography>
      </Box>

        <ProfileCard title="Contact">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
            <IconButton><EmailIcon /></IconButton>
            <Typography>{userData.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton><UserIcon /></IconButton>
            <Typography>{userData.username}</Typography>
          </Box>
        </ProfileCard>

        <ProfileCard title="Events">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton><EventIcon /></IconButton>
            <Typography>Events Created: {eventCount}</Typography>
          </Box>
        </ProfileCard>

        {/* Add more cards as needed */}
      </Box>
    </>
  );
};

export default UserProfile;
