// loginPage
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import tableimg from "../images/table.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useEmail } from '../base/EmailContext';

// import bcrypt from 'bcrypt';

const LoginCard = styled(Card)(({ theme }) => ({
  marginTop: "100px",
  width: '95vw',
  [theme.breakpoints.up('sm')]: {
    marginTop: "100px",
    width: '70vh',
  },
  margin: 'auto',
  backgroundColor: "rgba(255, 255, 255, 0.8)"
}));

function LoginForm() {
  const history = useNavigate();
  const { setEmail } = useEmail();
  const [email, setEmailValue] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState(''); // Changed state variable name
  const [password, setPassword] = useState('');


  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        usernameOrEmail,
        password
      });

      if (response.status === 200) {
        // Redirect to home page or perform any other action
        setEmail(usernameOrEmail);
        // Redirect to home page or perform any other action
        history("/Home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div style={{ backgroundImage: `url(${tableimg})`, margin: "0px 0px", backgroundSize: "cover", height: "100vh", paddingTop: "100px" }}>
      <LoginCard>
        <CardContent>
          <Typography variant="h4" className="heading"> <span>Log</span>In</Typography>
          <form onSubmit={submit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  name="username Or Email"
                  label="username Or Email"
                  value={usernameOrEmail}
                  onChange={(e) => { setUsernameOrEmail(e.target.value) }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <Typography sx={{ display: "flex", float: "right", marginTop: "5px", marginRight: "50px" }}>Don't have an account? <Link to="/SignUp">Sign Up</Link></Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </LoginCard>
    </div>
  );
};

export default LoginForm;
