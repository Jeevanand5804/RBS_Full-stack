import React from "react";
import preloaderGif from "../images/loader.gif";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloaderGif} alt="Loading..." className="preimage" />
    </div>
  );
};

export default Preloader;