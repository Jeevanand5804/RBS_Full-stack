import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import tableimg from "../images/table.jpg";
import { useEmail } from '../base/EmailContext'; // Import the useEmail hook

const SignUpCard = styled(Card)(({ theme }) => ({
  marginTop: "100px",
  width: '95vw', // Default width for small screens
  [theme.breakpoints.up('sm')]: {
    marginTop: "100px",
    width: '70vh', // Adjusted width for larger screens
  },
  margin: 'auto',
  backgroundColor: "rgba(255, 255, 255, 0.8)"
}));

function SignUp() {
  const history = useNavigate();
  const { setEmail } = useEmail(); // Use the setEmail function from the EmailContext
  const [username, setUsername] = useState('');
  const [email, setEmailValue] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password
      });
      if (response.data.message === "User created successfully") {
        setEmail(email); // Set the email using the setEmail function from EmailContext
        history("/Home", { state: { id: email } });
      } else {
        alert("User already exists");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div style={{ backgroundImage: `url(${tableimg})`, margin: "0px 0px", backgroundSize: "cover", height: "100vh", paddingTop: "100px" }}>
      <SignUpCard>
        <CardContent>
          <Typography variant="h4" className="heading"> <span>Sign</span>Up</Typography>
          <form onSubmit={submit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  type="text"
                  name="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmailValue(e.target.value)} // Update the email state using setEmailValue
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
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                <Typography sx={{ display: "flex", float: "right", marginTop: "5px", marginRight: "50px" }}>Already have an account? <Link to="/Login">Login</Link></Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </SignUpCard>
    </div>
  );
}

export default SignUp;
