import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container-fluid justify-content-center align-items " style={{marginTop:"100px"}}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
