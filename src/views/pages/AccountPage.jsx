import { useState,useEffect,useRef } from "react";
import { Grid, Typography, TextField, Button, Link, Avatar, Box, Badge, IconButton, Modal } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";
import { authenticate } from '../../app.jsx'

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
  const [avatarSrc, setAvatarSrc] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstName, setFirstName] = useState();
const [lastName, setLastName] = useState();
const [email, setEmail] = useState();
const [username, setUsername] = useState();

const [password, setPassword] = useState();
const [profilePicture, setProfilePicture] = useState();
 const fileInputRef = useRef(null); // Reference to the hidden file input

const handleFirstNameChange = (e) => {
  setFirstName(e.target.value);
};

const handleLastNameChange = (e) => {
  setLastName(e.target.value);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handleUsernameChange = (e) => {
  setUsername(e.target.value);
};


  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

 const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const src = URL.createObjectURL(file);
    setAvatarSrc(src); // Preview the selected image

    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('profilePicture', file); // 'profilePicture' is the field name, you can change it if your server expects a different name

    try {
      // Send the file to the server
      const response = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      console.log(data);
      // Handle the server response here. For example, the server might return the URL of the uploaded image.
      if (data.success && data.imageUrl) {
        setAvatarSrc("/mongo_api/server/" + data.imageUrl);
        setProfilePicture("/mongo_api/server/" + data.imageUrl);
        console.log("/mongo_api/server/" + data.imageUrl);
      } else {
        console.error('Error uploading image:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

useEffect(() => {
  // Define an asynchronous function
  const fetchData = async () => {
    try {
      // Assuming authenticate() is an async function that returns the user's ID
      const userId = await authenticate(); 

      const response = await fetch(`http://localhost:5050/api/users/${userId}`);
      const data = await response.json();
        console.log(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setUsername(data.username);
      setProfilePicture(data.profilePicture);
      setAvatarSrc(data.profilePicture); // Preview the selected image
      console.log(data.profilePicture + " OOOHAA");
      // Populate other states as necessary
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Call the asynchronous function
  fetchData();
}, []);



  const handleChangePasswordClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
const handleSaveChanges = async () => {
  const updatedData = {
    firstName,
    lastName,
    email,
    username,
    profilePicture: profilePicture
  };

  try {
    // Assuming authenticate() is an async function that returns the user's ID
    const userId = await authenticate();

    const response = await fetch(`http://localhost:5050/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    const data = await response.json();
    if (data.message === "User updated successfully") {
      console.log("User data updated successfully!");
    } else {
      console.error('Error updating user data:', data.message);
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};


const handleSavePassword = async () => {
  // Ensure the new password and confirm password are the same
  if (newPassword !== confirmPassword) {
    console.error("New password and confirm password do not match.");
    return;
  }

  // Assuming authenticate() is an async function that returns the user's ID
  const userId = await authenticate();

  // Create the payload for the request
  const payload = {
    currentPassword: currentPassword,
    newPassword: newPassword
  };

  try {
    // Make a PATCH request to update the password on the server
    const response = await fetch(`http://localhost:5050/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      console.log("Password updated successfully!");
      setOpenModal(false); // Close the modal
    } else {
      console.error('Error updating password:', data.message);
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
  handleCloseModal();
};


  // Handle avatar update here
  const handleAvatarChange = () => {
    // Logic to change avatar picture.
    // For the sake of this example, let's use another placeholder image
    setAvatarSrc({profilePicture});
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
            <IconButton size="small" color="primary" onClick={handleAvatarClick}>
              <EditIcon />
            </IconButton>
          }
        >
          <Avatar src={avatarSrc} alt={username} sx={{ width: 100, height: 100, marginRight: 2 }} />
        </Badge>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*" // Only accept image files
        />
        <Typography variant="h4" sx={{ color: "whitesmoke", ml: 6}} gutterBottom>
          Settings for {username}
        </Typography>
      </Box>
      <Box sx={{ pl: 20}}>
        <TextField
          variant="filled"
          label=""
          value={firstName}
          onChange={handleFirstNameChange}
          sx={{ mb: 2, mr: 2, ml: 4, backgroundColor: "whitesmoke"}}
        />
        <TextField
          variant="filled"
          label=""
          value={lastName}
          onChange={handleLastNameChange}
          sx={{ mb: 2, backgroundColor: "whitesmoke", width: 218}}
        />
        <p></p>
        <TextField
          variant="filled"
          label=""
          value={email}
          onChange={handleEmailChange}
   
          sx={{ mb: 2, width: 438, ml: 4, backgroundColor: "whitesmoke"}}
        />
        <p></p>
        <TextField
          variant="filled"
          label=""
          value={username}
          onChange={handleUsernameChange}
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
              value={password}
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
        <Button onClick={handleSaveChanges} variant="contained" sx={{ mb: 2, ml: 4, width: 438, backgroundColor: "#F6D58D"}}>
          Save changes
        </Button>
      </Box>
    </div>
    </>
  );
}
export default Accountpage;