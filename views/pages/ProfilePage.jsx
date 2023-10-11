import { Typography, Avatar, Grid, Paper, Box, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import UserIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";

const sampleUserData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  eventcount: "42",
  username: "exampleUser123",
  email: "john.doe@example.com",
  profilePicture: "https://via.placeholder.com/150",
};


const ProfileCard = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 2, backgroundColor: '#FFFFFF' }}>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    {children}
  </Paper>
);

const UserProfile = () => {
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
            src={sampleUserData.profilePicture} 
            sx={{ width: 150, height: 150, mb: 3, ml: 3 }}
        />

        <Typography variant="h2" sx={{color: "white", p: 3}} gutterBottom>
          {sampleUserData.firstname} {sampleUserData.lastname}
        </Typography>
      </Box>

        <ProfileCard title="Contact">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
            <IconButton><EmailIcon /></IconButton>
            <Typography>{sampleUserData.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton><UserIcon /></IconButton>
            <Typography>{sampleUserData.username}</Typography>
          </Box>
        </ProfileCard>

        <ProfileCard title="Events">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton><EventIcon /></IconButton>
            <Typography>Events Created: {sampleUserData.eventcount}</Typography>
          </Box>
        </ProfileCard>

        {/* Add more cards as needed */}
      </Box>
    </>
  );
};

export default UserProfile;