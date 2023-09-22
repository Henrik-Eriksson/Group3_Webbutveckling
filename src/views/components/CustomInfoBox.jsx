import { Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function CustomInfoBox(props) {
  return (
    <Grid item xs={12} sm={6} md={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <Paper sx={{p:5, backgroundColor: 'rgba(255, 255, 255, 0.0)', boxShadow: 'none'}}>
        <Typography variant="h2" sx={{color: "white"}} gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" sx={{color: "white"}} gutterBottom>
          {props.text}
        </Typography>
      </Paper>
    </Grid>
  );
}

CustomInfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomInfoBox;
