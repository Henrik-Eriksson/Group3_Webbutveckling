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

function CustomInfoBox(props)
{
  return(
        <Grid item xs={12} sm ={6} md = {6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }  }}>

           
        <Paper sx={{p:5,backgroundColor: 'rgba(255, 255, 255, 0.0)', boxShadow: 'none'}}>
                <Typography variant="h2" sx={{color: "white"}} gutterBottom>
                         {props.title}
                </Typography>

                                <Typography variant="h5" sx={{color: "white"}} gutterBottom>
            {props.text}
                </Typography>

        
      </Paper>
        </Grid>
)
}


export default CustomInfoBox;