import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from "@mui/material";
import Preloader from "../src/base/preload";
import Layout from "../src/base/Layout";
import Home from "../src/Components/Home";
import Menu from "./Components/Menu";
import AboutUs from "../src/Components/AboutUs";
import Reservation from "../src/Components/Reservation";
import OrderFood from "../src/Components/OrderFood";
import History from "../src/Components/History";
import Login from '../src/Autentication/Login'; // Assuming you have a LoginPage component
import SignUp from '../src/Autentication/SignUp'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track whether the user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // State to track whether the logged-in user is an admin

  // Function to toggle between login and signup pages
  const toggleLoginSignup = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  // Example function to check if the logged-in user is an admin
  const checkAdminStatus = (email) => {
    // Replace this with your logic to check if the logged-in user is an admin
    return email === 'admin@gmail.com'|| "admin";
  };

  useEffect(() => {
    // Simulating user login (you can replace this with actual authentication logic)
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true); // Assuming user is logged in after preloader finishes
      setIsAdmin(true); // Check admin status
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
                  <Route element={<Layout />}>
                {isLoggedIn ? ( // If user is logged in
                  <> 
                    <Route path="Home" element={<Home />} />
                    <Route path="Menu" element={<Menu />} />
                    <Route path="Reservation" element={<Reservation />} />
                    <Route path="OrderFood" element={<OrderFood />} />
                    <Route path="History" element={<History />} />
                    <Route path="AboutUs" element={<AboutUs />} />
                    <Route path="LogIn" element={<Login/>} />
                    <Route path="SignUp" element={<SignUp />} />
                   </>
                ) : (
                  <>
                    <Route path="SignUp" element={<SignUp />} />
                  </>
                )}
              </Route>
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
