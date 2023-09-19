import { createRoot } from 'react-dom/client';
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Paper, Box, Grid, TextField, Checkbox, FormGroup, FormControlLabel} from '@mui/material'
import styled from '@emotion/styled';


const InfoField = styled(TextField) ({
  width: 600,
  height: 60,
  color: 'red',
});


function Signup() {
  return (
    <Grid container>
      <Grid item xs={8} sm ={6} md = {2}>
        <Paper>
        </Paper>
        </Grid>
        <Grid item xs={8} sm = {6} md = {8} spacing = {2}>
        <Paper>
          <body id = "signUpBox">
          <h1>Sign Up For Application</h1>
          <InfoField id ="signuptext" label = "Enter your First Name" variant="outlined" size = "large"/>
          <p></p>
          <InfoField id ="signuptext" label = "Enter your Last Name" variant="outlined" size = "large"/>
          <p></p>
          <InfoField id ="signuptext" label = "Enter your Username" variant="outlined" size = "large"/>
          <p></p>
          <InfoField id ="signuptext" label = "Enter your Email-address" variant="outlined" size = "large"/>
          <p></p>
          <InfoField id ="signuptext" label = "Enter your Password" variant="outlined" size = "large"/>
          <p></p>
          <InfoField id ="signuptext" label = "Confirm your Password" variant="outlined" size = "large"/>
          <p></p>
          <Button variant="contained"  sx={{width: 600, height: 60}} size = "large">CREATE YOUR ACCOUNT</Button>
          <p>Already have an account? <m>click here!</m></p>
          <p>Login with Google</p>
          </body>
        </Paper>
        </Grid>
        <Grid item xs={8} sm = {6} md = {2} spacing = {2}>
        <Paper>
        </Paper>
        </Grid>
    </Grid>
  )
}

export default Signup;
// For traditional rendering
// ReactDOM.render(<App />, document.getElementById('root'));
