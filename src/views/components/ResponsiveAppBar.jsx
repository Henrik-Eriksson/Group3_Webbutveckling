import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import NotificationCenter from './NotificationCenter.jsx';
import { authenticate } from '../../app.jsx'
import { useState, useEffect} from "react";
import axios from 'axios';
const pages = ['Home', 'Calendar', 'Profile', 'Account'];
const links = ['', 'calendar', 'profile', 'account']; 
const settings = ['Profile', 'Account', 'Logout'];
const types = ["success", "info", "warning", "error"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [invites, setInvites] = useState([]);
  const [inviterUsername, setInviterUsername] = useState(''); // State to hold the inviter's username
  const [toastMap, setToastMap] = useState({});
  const [userData, setUserData] = useState({
  profilePicture: 'https://via.placeholder.com/150' // default image
});


const playNotificationSound = () => {
  const audio = new Audio('src/assets/pling.mp3'); // Adjust the path if your audio file is located elsewhere
  audio.play();
};


const fetchInvites = async () => {
  try {
    const userId = await authenticate();
    const response = await axios.get(`http://localhost:5050/api/invites/receivedInvites/${userId}`);
    const fetchedInvites = response.data;
    const inviterUsernames = {};

    // Fetch usernames for each inviter
    for (let invite of fetchedInvites) {
      if (invite.inviter) {
        const usernameResponse = await fetchInviterUsername(invite.inviter);
        inviterUsernames[invite.inviter] = usernameResponse;
      }
    }

    // Now you have a map of inviter IDs to usernames in inviterUsernames
    // You can use this map to display the usernames in your component

    setInvites(fetchedInvites);
  } catch (error) {
    console.error("Error fetching invites:", error);
  }
};


  const fetchInviterUsername = async (inviterId) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/users/usernameFromId/${inviterId}`);
      setInviterUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching inviter's username:", error);
    }
  };

useEffect(() => {
    fetchInvites(); // Fetch invites immediately on component mount

    const intervalId = setInterval(() => {
      fetchInvites();
    }, 5000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []); // Empty dependency array so it only runs on mount and unmount

useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await authenticate();
        const response = await fetch(`http://localhost:5050/api/users/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

const [prevInvitesCount, setPrevInvitesCount] = useState(0);

useEffect(() => {
  if (invites.length > prevInvitesCount) {
    const newInvites = invites.slice(prevInvitesCount); // Get only the new invites

    newInvites.forEach(async (invite) => {
      if (invite.inviter) {
        try {
          const response = await axios.get(`http://localhost:5050/api/users/usernameFromId/${invite.inviter}`);
          const inviterUsername = response.data.username;
          toast(`You have a new invite from ${inviterUsername}`, {
            type: "info",
            data: { inviteId: invite._id, eventId: invite.eventId }
          });
          playNotificationSound(); 
        } catch (error) {
          console.error("Error fetching inviter's username:", error);
        }
      }
    });

    setPrevInvitesCount(invites.length);
  }
}, [invites]);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    
    setAnchorElUser(null);
  };

  const handleClickNavMenu = (page) => {
   
    window.location.replace("/" + links[pages.indexOf(page)]);
  };


  

  const handleClickUserMenu = (setting) => {
  setAnchorElUser(null);
  
  if (setting === "Logout") {
    window.location.href = "/logout";
  } else if (setting === "Profile") {
    window.location.href = "/profile";
  } else if (setting === "Account") {
    window.location.href = "/account";
  }
};


    const addNotification = () => {
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)]
    });
  };

  return (
    <AppBar position="static" sx = {{backgroundColor: '#0F8294'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src= "../../src/assets/Fish_icon.png" sx={{ display: { xs: 'none', md: 'inline'}, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TimeTuna
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClose={handleCloseNavMenu} onClick={() => handleClickNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar src= "../../src/assets/Fish_icon.png" sx={{ display: { xs: 'flex', md: 'none'}, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TimeTuna
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClickNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/*<IconButton color="inherit" onClick={addNotification}>
            <Tooltip title="Add Notification">
              <MenuIcon />
            </Tooltip>
          </IconButton>*/}

          <NotificationCenter newInvitesCount={invites.length} />

          <ToastContainer position="bottom-right" newestOnTop />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{ml: 5}} src={userData.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleClickUserMenu}
            >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => handleClickUserMenu(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;