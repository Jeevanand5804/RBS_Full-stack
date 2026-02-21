import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import UserDetails from "./UserDetails";
import AddTable from "./AddTable";

function Home() {
  const [totalOrders, setTotalOrders] = useState(0);
const[totalReservation,setTotalReservation]=useState(0);

  useEffect(() => {
    // Fetch total number of orders from the backend API
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getTotalOrders");
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };
    const fetchTotalReserve = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getTotalReserve");
        setTotalReservation(response.data.totalReservation);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };
    fetchTotalOrders();
    fetchTotalReserve();
  }, []);
  return (
    <Container>
    
    <div>
      <h1>Welcome to AdminPortal</h1>
      <Typography variant="h4">Total FoodOrders: {totalOrders}</Typography>
      <Typography variant="h4">Total Table Reservations: {totalReservation}</Typography>
    </div>
    <div>
      <UserDetails/>
    </div>
    <div>
      <AddTable/>
    </div>
    </Container>
  )
}

export default Home
