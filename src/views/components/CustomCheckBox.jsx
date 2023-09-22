import { Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

function CustomCheckBox(props) {
  return (
    <FormControlLabel
      sx={{color: "white"}}
      control={<Checkbox defaultChecked sx={{color: "purple"}} color="secondary" size="small" />}
      label={props.label}
    />
  );
}

CustomCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomCheckBox;
