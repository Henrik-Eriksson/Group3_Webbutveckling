import { createRoot } from 'react-dom/client';
import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Paper, Box, Grid, TextField, Checkbox, FormGroup, FormControlLabel, Hidden, Link, SvgIcon} from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';

function CustomCheckBox(props)
{
  return(
  <FormControlLabel sx={{color: "white"}} control = {<Checkbox defaultChecked sx={{color: "purple"}} color="secondary" size = "small" />} label = {props.label}/>
  )
}

export default CustomCheckBox;