import { useState } from "react";
import { Grid, Typography, TextField, Button, Link, Avatar, Box, Badge, IconButton, Modal } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
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

function Accountpage() {
  const [avatarSrc, setAvatarSrc] = useState(sampleUserData.profilePicture);
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleChangePasswordClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSavePassword = () => {
    // Logic to save the new password
    // Ensure the new password and confirm password are the same
    // Validate the current password

    handleCloseModal();
  };

  // Handle avatar update here
  const handleAvatarChange = () => {
    // Logic to change avatar picture.
    // For the sake of this example, let's use another placeholder image
    setAvatarSrc('https://via.placeholder.com/140');
  };
  return (
    <>
      <ResponsiveAppBar />
      <div style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),url(./src/assets/xd.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton size="small" color="primary" onClick={handleAvatarChange}>
              <EditIcon />
            </IconButton>
          }
        >
          <Avatar src={avatarSrc} alt={sampleUserData.username} sx={{ width: 100, height: 100, marginRight: 2 }} />
        </Badge>
        <Typography variant="h4" sx={{ color: "whitesmoke", ml: 6}} gutterBottom>
          Settings for {sampleUserData.username}
        </Typography>
      </Box>
      <Box sx={{ pl: 20}}>
        <TextField
          variant="filled"
          label="First Name"
          defaultValue={sampleUserData.firstname}
          sx={{ mb: 2, mr: 2, ml: 4, backgroundColor: "whitesmoke"}}
        />
        <TextField
          variant="filled"
          label="Last Name"
          defaultValue={sampleUserData.lastname}
          sx={{ mb: 2, backgroundColor: "whitesmoke", width: 218}}
        />
        <p></p>
        <TextField
          variant="filled"
          label="Email"
          defaultValue={sampleUserData.email}
          sx={{ mb: 2, width: 438, ml: 4, backgroundColor: "whitesmoke"}}
        />
        <p></p>
        <TextField
          variant="filled"
          label="Username"
          defaultValue={sampleUserData.username}
          sx={{ mb: 2, width: 438, ml: 4, backgroundColor: "whitesmoke"}}
        />
        <p></p>
                <Button variant="contained" color="secondary" onClick={handleChangePasswordClick} sx={{ mt: 2, ml: 4,  width: 438, backgroundColor: "#F6D58D"}}>
          Change Password
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="change-password-title"
          aria-describedby="change-password-description"
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            p: 4, 
            boxShadow: 24 
          }}>
            <Typography variant="h6" id="change-password-title">
              Change Password
            </Typography>
            <TextField 
              type="password" 
              fullWidth 
              label="Current Password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)} 
              sx={{ mt: 2 }} 
            />
            <TextField 
              type="password" 
              fullWidth 
              label="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              sx={{ mt: 2 }} 
            />
            <TextField 
              type="password" 
              fullWidth 
              label="Confirm New Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              sx={{ mt: 2 }} 
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSavePassword} 
              sx={{ mt: 2, backgroundColor: "#F6D58D", width: 400}}
            >
              Save New Password
            </Button>
          </Box>
        </Modal>
        <p></p>
        <Button variant="contained" sx={{ mb: 2, ml: 4, width: 438, backgroundColor: "#F6D58D"}}>
          Save changes
        </Button>
      </Box>
    </div>
    </>
  );
}
export default Accountpage;