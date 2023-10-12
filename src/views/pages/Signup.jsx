import {Grid,Link} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import CustomInputField from '../components/CustomInputField.jsx';
import CustomCheckBox from '../components/CustomCheckBox.jsx';
import CustomForm from '../components/CustomForm.jsx';
import React, { useState } from 'react';
import axios from 'axios'; // You can use axios for making HTTP requests



function Signup() {
        const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    //State variables to track if username and/or email already exists
    const [usernameExistsError, setUsernameExistsError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);

    // State variable to track password error
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [passwordLengthError, setPasswordLengthError] = useState(false);

    // State variables to track First & Last Name validity
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastNameError, setLastNameError] = useState(false);

    // State variable to track username validity
    const [usernameError, setUsernameError] = useState(false);

    // State variable to track email validity
    const [emailError, setEmailError] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setUsernameExistsError(false);
  setEmailExistsError(false);

  // Check if username already exists
  try {
    const usernameResponse = await axios.get(`http://localhost:5050/api/users/username/${formData.username}`);
    console.log(usernameResponse);
    if(usernameResponse.data == true) {setUsernameExistsError(true)}
  } catch (error) {
    if (error.response.status !== 404) {
      console.error("An error occurred while checking the username:", error);
    }
  }

  // Check if email already exists
  try {
    const emailResponse = await axios.get(`http://localhost:5050/api/users/email/${formData.email}`);
    if(emailResponse.data == true) {setEmailExistsError(true)}
  } catch (error) {
    if (error.response.status !== 404) {
      console.error("An error occurred while checking the email:", error);
    }
  }

  let hasPasswordMatchError = formData.password !== formData.confirmPassword;
  let hasPasswordLengthError = formData.password.length < 8 || formData.password.length > 50;
  let hasLastNameError = !(/^[A-Za-zåäöÅÄÖ]+$/.test(formData.lastName)) || formData.lastName.length < 2 || formData.lastName.length > 35;
  let hasFirstNameError = !(/^[A-Za-zåäöÅÄÖ]+$/.test(formData.firstName)) || formData.firstName.length < 2 || formData.firstName.length > 35;
  let hasUsernameError = !(/^[A-Za-z0-9åäöÅÄÖ]+$/.test(formData.username)) || formData.username.length < 2 || formData.username.length > 35;
  let hasEmailError = !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email));

  // Update state variables
  setPasswordMatchError(hasPasswordMatchError);
  setPasswordLengthError(hasPasswordLengthError);
  setLastNameError(hasLastNameError);
  setFirstNameError(hasFirstNameError);
  setUsernameError(hasUsernameError);
  setEmailError(hasEmailError);

  // If any error is present, return early
  if (hasPasswordMatchError || hasPasswordLengthError || hasFirstNameError || hasLastNameError || hasUsernameError || hasEmailError) {
      return; // No reason to continue with the HTTP post to the MongoDB API
  }
  try {
    const response = await axios.post('http://localhost:5050/api/users/signup', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    if (response.status === 200) {
      //alert("Signup successful!");
      console.log(response.data);
      localStorage.setItem('session', response.data);
      location.replace('/');
    } else {
      console.log(response);
      alert("Signup failed!");
    }
  } catch (error) {
    alert("An error occurred: " + error.message);
  }
};

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/xd.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      height: "100vh", // This will make sure the div takes the full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>        
        <CustomForm title = "Create Your Account" titleColor = "White" buttonName="Sign Up" onSubmit={handleSubmit}>


        <CustomInputField error = {firstNameError} helperText={firstNameError ? "Invalid first name" : ""} label="First Name" value={formData.firstName}  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
        <CustomInputField error = {lastNameError} helperText={lastNameError ? "Invalid last name" : ""} label="Last Name" value={formData.lastName}  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
        <CustomInputField error = {usernameError || usernameExistsError} helperText={usernameError ? "Invalid username" : (usernameExistsError ? "Username already exists" : "")} label="Username" value={formData.username}  onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
        <CustomInputField error = {emailError || emailExistsError} helperText={emailError ? "Invalid email" : (emailExistsError ? "Email already exists" : "")}  label="Email-address" value={formData.email}  onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <CustomInputField type="password" error = {passwordMatchError || passwordLengthError} helperText={passwordMatchError ? "Passwords do not match" : (passwordLengthError ? "Password too short" : "")}  label="Password" value={formData.password}  onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
        <CustomInputField type="password" error = {passwordMatchError || passwordLengthError} helperText={passwordMatchError ? "Passwords do not match" : (passwordLengthError ? "Password too short" : "")}  label="Confirm Password" value={formData.confirmPassword}  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
        
          <Typography color="white" variant="paragraph" gutterBottom>
          {/*SPECIFIC FOR SIGN UP*/}
          <Link href="/login">
            {"Already have an account?"}
          </Link>
          {/*:::::::::::::::::::::::::::::*/}
          </Typography>
          
        </CustomForm>
    </Grid>
  </div>
  )
}
export default Signup;
