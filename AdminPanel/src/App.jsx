import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from "@mui/material";
import Preloader from "../src/Base/Preload";
import Layout from "../src/Base/Layout";
import Home from "../src/Components/Home";
import Menu from "../src/Components/Menu";
import Login from '../src/Authentication/Login'; // Assuming you have a LoginPage component
import SignUp from '../src/Authentication/Signup';
import FoodOrderHistory from "../src/Components/TotalFoodOrders";
import ReservationHistory from "../src/Components/TotalTableReservation";
import "./App.css";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Simulating user login (you can replace this with actual authentication logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <CssBaseline />
          <Router>
            <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="SignUp" element={<SignUp />} />
                  <Route element={<Layout />}>
                  <>
                    <Route path="Home" element={<Home />} />
                    <Route path="Menu" element={<Menu />} />
                    <Route path="Reservations" element={<ReservationHistory />} />
                    <Route path="OrderFoods" element={<FoodOrderHistory />} />
                    <Route path="History" element={<History />} />
                    <Route path="LogIn" element={<Login/>} />
                    <Route path="SignUp" element={<SignUp />} />
                  </>
               
              </Route>
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
