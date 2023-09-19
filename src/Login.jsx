import { createRoot } from 'react-dom/client';
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Paper, Box, Grid, TextField, Checkbox, FormGroup, FormControlLabel} from '@mui/material'



function Login() {
  return (
    <Grid container>
      <Grid item xs={8} sm ={6} md = {6}>
        <Paper>
          <div id = "signinbox1">
          <h1>
            Welcome to our application
          </h1>
          <h5>
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
          </h5>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={8} sm = {6} md = {6} spacing = {3}>
        <Paper>
          <div id="signinbox2">
          <h2 id = "signin">
            Sign In
          </h2>
          <FormGroup>
          <TextField id ="outlined-basic" label = "Username" variant="outlined" size = "small"/>
          <p></p>
          <TextField id ="outlined-basic" label = "Password" variant="outlined" size="small"/>
          <p></p>
          <FormControlLabel required control = {<Checkbox defaultChecked size = "small" />} label = "Remember me"/>
          <Button id = "loginbutton">LOGIN</Button>
          </FormGroup>
          <p>Don't have an account?</p>
          <p>Login with your google account</p>
          </div>
        </Paper>
        </Grid>
    </Grid>
  )
}

export default Login;
// For traditional rendering
// ReactDOM.render(<App />, document.getElementById('root'));
