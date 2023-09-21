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


function CustomInputField(props)
{
  return(
          <>
          <TextField sx={{backgroundColor: "white", borderRadius: "5px"}} id ="outlined-basic" label = {props.label} variant="filled" size = "small"/>
          <br></br>
          </>
           )
}

export default CustomInputField;
