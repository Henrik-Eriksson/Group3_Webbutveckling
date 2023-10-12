import { Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

function CustomCheckBox(props) {
  return (
    <FormControlLabel
      sx={{color: "white"}}
      control={<Checkbox defaultChecked sx={{color: "white", '&.Mui-checked': {
        color: "#F6D58D"
      }}} color="secondary" size="small" />}
      label={props.label}
      onChange={props.onChange}
      checked={props.checked}
      defaultChecked={false}
    />
  );
}

CustomCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomCheckBox;
