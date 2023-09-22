import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

function CustomInputField(props) {
  return (
    <>
      <TextField 
        sx={{backgroundColor: "white", borderRadius: "5px"}}
        id="outlined-basic"
        label={props.label}
        variant="filled"
        size="small"
      />
      <br />
    </>
  );
}

CustomInputField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomInputField;
