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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/hejsan.png)`,
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
          </Typography>
          <Link href="/signup" variant ="h6">
            {"Don't have an account?"}
          </Link>
          {/*:::::::::::::::::::::::::::::*/}
        </CustomForm>
    </Grid>
    </div>
  )
 } 
export default Login;
