import { createRoot } from 'react-dom/client';
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Paper, Box, Grid, TextField, Checkbox, FormGroup, FormControlLabel, Hidden} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';



function Login() {
  return (
    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>
      <Grid item xs={12} sm ={6} md = {6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }  }}>

             

        <Paper sx={{p:5}}>
                <Typography variant="h2" gutterBottom>
                         Welcome to our application
                </Typography>

                                <Typography variant="h5" gutterBottom>
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
                </Typography>

        
      </Paper>
        </Grid>
        <Grid item xs={12} sm = {10} md = {6} sx={{p: {xl: 10, lg: 10, md: 0, xs: 0, sm: 0}, m: 0 }}>
   
        <Paper sx={{p:5}}>
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
          <FormGroup>
          <TextField id ="outlined-basic" label = "Username" variant="outlined" size = "small"/>
          <p></p>
          <TextField id ="outlined-basic" label = "Password" variant="outlined" size="small"/>
          <p></p>
          <FormControlLabel required control = {<Checkbox defaultChecked size = "small" />} label = "Remember me"/>
          <Button id = "loginbutton">LOGIN</Button>
          </FormGroup>
          <Typography variant="paragraph" gutterBottom>
            Don't have an account?
          </Typography>
          <Typography variant="paragraph" gutterBottom>
            <br></br>Login with your google account
          </Typography>
       
        </Paper>
        </Grid>
    </Grid>
  )
}

export default Login;
// For traditional rendering
// ReactDOM.render(<App />, document.getElementById('root'));
