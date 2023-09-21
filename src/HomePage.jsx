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
import ResponsiveAppBar from './ResponsiveAppBar.jsx';
import { Grid, Paper} from '@mui/material';

function HomePageGrid(){
    return(
        <Grid container spacing = {0} sx ={{alignItems: 'center', justifyContent: 'center'}}>
                <Grid item xs={12} sm ={6} md = {6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }  }}>
                    <Paper sx = {{p: 5, boxShadow: 'none', backgroundColor: 'rgba(255,255,255,0.0)'}}>
                         <img src='../HomePage_picture.png' width = "600" height = "600"></img>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm = {10} md = {6}>
                    <Paper sx={{boxShadow: 'none'}}>
                        <p></p>
                        <Typography variant="h5" align = "center">🌟 Why Choose [Your App's Name]? 🌟</Typography><br></br>
                        <Typography variant="body1">
                            1️⃣ Simplicity at Its Best: Our user-friendly interface makes scheduling a breeze. Create events, set reminders, and manage your day, week, or month in a few clicks<p></p>
                            2️⃣ Collaborate Like a Pro: Invite others to your events effortlessly. Whether it's a business meeting or a family get-together, coordinating has never been easier.<p></p>
                            3️⃣ Cross-Platform Accessibility: Access your schedule from any device, anywhere. Your data is securely stored and synchronized in real-time.<p></p>
                            4️⃣ Customization: Tailor your calendar to fit your style. Choose from various themes, view options, and notification settings.<p></p>
                            5️⃣ Privacy Guaranteed: Your data is encrypted and secure. Share what you want, with whom you want.<p></p>
                        </Typography>
                        <Typography variant="h6" align='center'>Click the button below to start planning!</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="contained" sx={{ width: 370, height: 60 }} size="small" href="https://www.example.com">START HERE</Button>
                        </Box>                    
                    </Paper>
                </Grid>
            </Grid>
    )
}

function HomePage(){
    return(
        <div>
            <ResponsiveAppBar/>
            <HomePageGrid/>
        </div>
    )
}

export default HomePage;
