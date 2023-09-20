import { createRoot } from 'react-dom/client';
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Paper, Box, Grid, TextField, Checkbox, FormGroup, FormControlLabel, Hidden, Link, SvgIcon} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import CustomInputField from './components/CustomInputField.jsx';
import CustomCheckBox from './components/CustomCheckBox.jsx';
import CustomInfoBox from './components/CustomInfoBox.jsx';
import CustomForm from './components/CustomForm.jsx';

document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/bg.jpg)`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

function Login() {
  return (
    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>        
      <CustomInfoBox title="Welcome to our application" text="this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. "/>
        <CustomForm buttonName="Login">
        <CustomInputField label="Username"/>
        <CustomInputField label="Password"/>
        <CustomCheckBox label="Remember me"/>
          <Typography color="white" variant="paragraph" gutterBottom>
          {/*SPECIFIC FOR LOGIN*/}
          <br></br>
            <Link href="https://google.com"><SvgIcon fontSize="large"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg></SvgIcon></Link><br></br>
          </Typography>
          <Link>
            Don't have an account?
          </Link>
          {/*:::::::::::::::::::::::::::::*/}
        </CustomForm>
    </Grid>
  )
}

export default Login;
// For traditional rendering
// ReactDOM.render(<App />, document.getElementById('root'));




document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/bg.jpg)`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

function Login() {
  return (
    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>        
      <CustomInfoBox title="Welcome to our application" text="this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. 
            this is a example text for our application. this is a example text for our application. this is a example text for our application. "/>
        <CustomForm buttonName="Login">
        <CustomInputField label="Username"/>
        <CustomInputField label="Password"/>
        <CustomCheckBox label="Remember me"/>
          <Typography color="white" variant="paragraph" gutterBottom>
          {/*SPECIFIC FOR LOGIN*/}
          <br></br>
            <Link href="https://google.com"><SvgIcon fontSize="large"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg></SvgIcon></Link><br></br>
          </Typography>
          <Link>
            Don't have an account?
          </Link>
          {/*:::::::::::::::::::::::::::::*/}
        </CustomForm>
    </Grid>
  )
}

export default Login;
// For traditional rendering
// ReactDOM.render(<App />, document.getElementById('root'));
