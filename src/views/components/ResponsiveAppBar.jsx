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

  const fetchInvites = async () => {
    try {
      const userId = await authenticate();
      const response = await axios.get(`http://localhost:5050/api/invites/receivedInvites/${userId}`);
      setInvites(response.data);
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  };

  useEffect(() => {
  fetchInvites(); // Fetch invites immediately on component mount

    const intervalId = setInterval(() => {
      fetchInvites();
    }, 10000); // Fetch every 5 minutes

    return () => clearInterval(intervalId); // Cleanup on component unmount
}, []);


const [prevInvitesCount, setPrevInvitesCount] = useState(0);

useEffect(() => {
  if (invites.length > prevInvitesCount) {
    toast("You have a new invite!", {
      type: "info"
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
    
    if(setting == "Logout")
    {
      window.location.href = "/logout";
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
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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

          <IconButton color="inherit" onClick={addNotification}>
            <Tooltip title="Add Notification">
              <MenuIcon />
            </Tooltip>
          </IconButton>

          <NotificationCenter newInvitesCount={invites.length} />

          <ToastContainer position="bottom-right" newestOnTop />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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