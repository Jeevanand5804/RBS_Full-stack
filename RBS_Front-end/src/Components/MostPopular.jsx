import React from "react";
import p1 from "../images/p-1.jpg";
import p2 from "../images/p-2.jpg";
import p3 from "../images/p-3.jpg";
import p4 from "../images/p-4.jpg";
import p5 from "../images/p-5.jpg";
import p6 from "../images/p-6.jpg";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function PopularFoods() {
  return (
    <div className="popular fb sec" id="popular">
      <h1 className="heading">
        most <span>popular</span> foods
      </h1>
      <div className="box-container">

        <div className="box">
          <span className="price"> ₹50 - ₹120 </span>
          <img src={p1} alt="" />
          <h3>tasty burger</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>

        <div className="box">
          <span className="price"> ₹10 - ₹100 </span>
          <img src={p2} alt="" />
          <h3>tasty cakes</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>

        <div className="box">
          <span className="price"> ₹15 - ₹120 </span>
          <img src={p3} alt="" />
          <h3>tasty sweets</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>

        <div className="box">
          <span className="price"> ₹20 - ₹80 </span>
          <img src={p4} alt="" />
          <h3>tasty cupcakes</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>

        <div className="box">
          <span className="price"> ₹15 - ₹120 </span>
          <img src={p5} alt="" />
          <h3>cold drinks</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>

        <div className="box">
          <span className="price"> ₹20 - ₹120 </span>
          <img src={p6} alt="" />
          <h3>cold ice-cream</h3>
          <div className="stars">
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarIcon className="ms" />
            <StarBorderIcon className="ms" />
          </div>
          <Link to="/OrderFood" className="btn">
            order now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopularFoods;
