import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="container-fluid justify-content-center align-items ">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}

export default Layout;
