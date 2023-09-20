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
import CustomInputField from './CustomInputField.jsx';
import CustomCheckBox from './CustomCheckBox.jsx';

function CustomForm(props)
{
  
      const inputFields = [];
      const extraComponents = [];

      React.Children.forEach(props.children, child => {
        if (child.type === CustomInputField || child.type === CustomCheckBox) {
          inputFields.push(child);
        } else {
          extraComponents.push(child);
        }
      });
            
            return(
        <Grid item xs={12} sm = {10} md = {6} sx={{p: {xl: 10, lg: 10, md: 0, xs: 0, sm: 0}, m: 0 }}>
   
        <Paper sx={{p:5,backgroundColor: 'rgba(255, 255, 255, 0.0)', boxShadow: 'none'}}>
          <Typography sx={{color: "White"}} variant="h4" gutterBottom>
            Sign In
          </Typography>
          <FormGroup>
          {inputFields}
          <Button variant="contained">{props.buttonName}</Button>
          </FormGroup>
          {extraComponents}
        </Paper>
        </Grid>)
    
}


export default CustomForm;