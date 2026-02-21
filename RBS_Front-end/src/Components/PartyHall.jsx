import React, { useState } from 'react';
import { TextField, Button, Grid,Card,CardContent,useMediaQuery,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import "../App.css"
import partyimg from "../images/order-img.jpg"

const PartyHallCard = styled(Card)(({ theme }) => ({
  marginTop:"80px",
    width: '95vw', // Default width for small screens
    [theme.breakpoints.up('sm')]: {
      marginTop:"80px",
      width: '90vh', // Adjusted width for larger screens
    },
    margin: 'auto',
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  }));

const PartyHall = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    numberOfGuests: '',
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here

    // Assuming you have a function to handle form submission
    submitReservation(formData);
  };

  return (
    <div style={{backgroundImage:`url(${partyimg})`,margin:"10px 0px",backgroundSize:"cover",height:"80vh",paddingTop:"60px"}}>
    <PartyHallCard>
      <CardContent>
        <Typography variant="h4" className="heading"> <span>Party</span> Hall</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Number of Guests"
              name="numberOfGuests"
              type="number"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
              
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="outline" className='btn'>
          Submit Reservation
        </Button>
      </form>
      </CardContent>
    </PartyHallCard>
    </div>
  );
};

export default PartyHall;
