import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import { Grid, Link, SvgIcon } from '@mui/material';
import CustomInputField from '../components/CustomInputField.jsx';
import CustomCheckBox from '../components/CustomCheckBox.jsx';
import CustomInfoBox from '../components/CustomInfoBox.jsx';
import CustomForm from '../components/CustomForm.jsx';
import { useState } from 'react';
import axios from 'axios';



function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

// State variables to track if username and/or email already exist
const [usernameError, setUsernameError] = useState(false);
//const [emailExistsError, setEmailExistsError] = useState(false);
const [passwordMatchError, setPasswordMatchError] = useState(false); // Define passwordMatchError

const [rememberMe, setRememberMe] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();

  setUsernameError(false);
  setPasswordMatchError(false); // Reset passwordMatchError
  //setEmailExistsError(false);

  // Check if username already exists

   try {
    const response = await axios.post('http://localhost:5050/api/users/login', {
      username: formData.username,
      password: formData.password
    });

    if (response.status === 200) {
      console.log(response.data);
      if(rememberMe)
      {
        localStorage.setItem('session', response.data); //longterm
      } else {
        sessionStorage.setItem('session', response.data); //shortterm
      }
      location.replace('/');
    } else {

      console.log(response);
      
    }
  } catch (error) {
    console.log(error);
    if(error.response.data.error == "password")
    {
        setPasswordMatchError(true);
    }
    if(error.response.data.error == "username")
    {
      setUsernameError(true);
    }

    //TODO: ELSE DISPLAY A INTERNALS ERVER ERROR AT THE TOP
  }
};


  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/kissekatt.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh", // This will make sure the div takes the full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>

    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>        
      <CustomInfoBox title="Welcome to TimeTuna" text={
        <Typography variant="h5" >
          <br></br>
          {"TimeTuna a application that allows you to create events and manage your schedule."}
          <br></br>
          <br></br>
          {"Timetuna is a application that allows you to access your schedule from any device, anywhere."}
          <br></br>
          <br></br>
          {"Timetuna is a collaborative application that allows you to invite others to your events effortlessly."}
          <br></br>
          <br></br>
          {"Timetuna is free to use and is available on all platforms."}
        </Typography>
      }
      />
        <CustomForm title = "Login To Your Account" titleColor = "White" buttonName="Login" onSubmit={handleSubmit}
        
        >
        <CustomInputField 
        error = {usernameError} helperText={usernameError ? "Wrong username" : ""}
         label="Username"
         value={formData.username}
         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
         />
        <CustomInputField
          error = {passwordMatchError} helperText={passwordMatchError ? "Wrong Password": ""} 

         label="Password"
         type="password"
         value={formData.password}
         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
         />
        <CustomCheckBox checked={rememberMe} label="Remember me" onChange={(e) => setRememberMe(e.target.checked)}/>
        
          <Typography color="white" variant="paragraph" gutterBottom>
          {/*SPECIFIC FOR LOGIN*/}
          <br></br>
            <Link href="https://google.com"><SvgIcon fontSize="large"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg></SvgIcon></Link><br></br>
          </Typography>
          <Link href="/signup">
            {"Don't have an account?"}
          </Link>
          {/*:::::::::::::::::::::::::::::*/}
        </CustomForm>
    </Grid>
    </div>
  )
 } 
export default Login;
