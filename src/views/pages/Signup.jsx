import {Grid} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import CustomInputField from '../components/CustomInputField.jsx';
import CustomCheckBox from '../components/CustomCheckBox.jsx';
import CustomForm from '../components/CustomForm.jsx';



function Signup() {
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/bg.jpg)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh", // This will make sure the div takes the full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
    <Grid container spacing={0} sx={{p: 5, alignItems: 'center', justifyContent: 'center' }}>        
        <CustomForm buttonName="Sign Up">
        <CustomInputField label="First Name"/>
        <CustomInputField label="Last Name"/>
        <CustomInputField label="Username"/>
        <CustomInputField label="Email-address"/>
        <CustomInputField label="Password"/>
        <CustomInputField label="Confirm Password"/>
        <CustomCheckBox label="Remember me"/>
        
          <Typography color="white" variant="paragraph" gutterBottom>
          {/*SPECIFIC FOR SIGN UP*/}
          <p>Already have an account? <m>click here!</m></p>
          <p>Login with Google</p>
          {/*:::::::::::::::::::::::::::::*/}
          </Typography>
        </CustomForm>
    </Grid>
  </div>
  )
}
export default Signup;
