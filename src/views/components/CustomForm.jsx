import React from 'react';
import { Button, Paper, Grid, FormGroup, Typography, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import CustomInputField from './CustomInputField.jsx';
import CustomCheckBox from './CustomCheckBox.jsx';
import CustomizedMenus from './MenuItem.jsx';
import TimePicker from './TimePicker.jsx';

function CustomForm(props) {
  const inputFields = [];
  const extraComponents = [];

  React.Children.forEach(props.children, child => {
    if (child.type === CustomInputField || child.type === CustomCheckBox || child.type === CustomizedMenus || child.type === TextField || child.type === Button || child.type === Typography || child.type === TimePicker) {
      inputFields.push(child);
    } else {
      extraComponents.push(child);
    }
  });
          
  return (
    <Grid item xs={12} sm={10} md={6} sx={{p: {xl: 10, lg: 10, md: 0, xs: 0, sm: 0}, m: 0 }}>
      <Paper sx={{p:5, backgroundColor: 'rgba(255, 255, 255, 0.0)', boxShadow: 'none'}}>
        <Typography sx={{color: "White"}} variant="h4" gutterBottom>
          {props.buttonName}
        </Typography>
        <form onSubmit={props.onSubmit}>
        <FormGroup>
          {inputFields}
          <Button type="submit" variant="contained">{props.buttonName}</Button>
        </FormGroup>
        </form>
        {extraComponents}
      </Paper>
    </Grid>
  );
}

CustomForm.propTypes = {
  children: PropTypes.node.isRequired,
  buttonName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CustomForm;
