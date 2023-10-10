import  { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar.jsx";


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data (e.g., check for password match)

    // Send registration request to your authentication system or API
    // For this example, we'll assume success
    alert("Registration successful!");
  };

  return (
    <> 
    <ResponsiveAppBar/>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ background: "#AAF" }} // Change the background color here
      >
      <Grid item xs={10} sm={6} md={4}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Account
          </Typography>
          <TextField
            type="email"
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            margin="normal"
          >
            Account
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="#">Already have an account?</Link>
          <br />
          <Link href="#">Change password</Link>
          <br />
          <Link href="#">Change email</Link>
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default Register;
