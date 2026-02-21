import React from "react";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";
import pic3 from "../images/pic3.png";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
// import Zoom from "react-reveal/Zoom";
// import Fade from "react-reveal/Fade";

function Review() {
  return (
    <div className="review fb sec" id="review">
      {/* <Zoom> */}
        <h1 className="heading">
          our customers <span>reviews</span>
        </h1>
      {/* </Zoom> */}

      <div className="box-container">
        {/* <Fade bottom> */}
          <div className="box">
            <img src={pic1} alt="" />
            <h3>Angeline</h3>
            {/* <Zoom> */}
              <div className="stars">
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
              </div>
            {/* </Zoom> */}
            <p>
              "Outstanding food delivery service! Quick, efficient, and the
              taste was out of this world. Will definitely order again!"
            </p>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={300}> */}
          <div className="box">
            <img src={pic2} alt="" />
            <h3>jack</h3>
            {/* <Zoom> */}
              <div className="stars">
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarHalfIcon className="rs" />
              </div>
            {/* </Zoom> */}
            <p>
              "I'm impressed! The food was delicious, arrived hot, and the
              portions were generous. A five-star experience all around."
            </p>
          </div>
        {/* </Fade> */}

        {/* <Fade bottom delay={600}> */}
          <div className="box">
            <img src={pic3} alt="" />
            <h3>Nandy</h3>
            {/* <Zoom> */}
              <div className="stars">
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
              </div>
            {/* </Zoom> */}
            <p>
              "Top-notch service! The food quality and taste were exceptional.
              They truly understand the meaning of customer satisfaction. Highly
              recommended!"
            </p>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={600}> */}
          <div className="box">
            <img src={pic3} alt="" />
            <h3>Nandy</h3>
            {/* <Zoom> */}
              <div className="stars">
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
                <StarIcon className="rs" color="warnimg" />
              </div>
            {/* </Zoom> */}
            <p>
              "Top-notch service! The food quality and taste were exceptional.
              They truly understand the meaning of customer satisfaction. Highly
              recommended!"
            </p>
          </div>
        {/* </Fade> */}
      </div>
    </div>
  );
}

export default Review;
