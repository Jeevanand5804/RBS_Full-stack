import React from 'react'
import MostPopular from "../Components/MostPopular";
import HowItWorks from '../Components/HowItWorks';
import Review from "../Components/Review";
import { styled } from "@mui/material/styles";
import homeImg from "../images/home-img.png";
import hbg from "../images/home-bg.jpg";
// import Bounce from "react-reveal/Bounce";
import Paper from "@mui/material/Paper";
import "../App.css";
import GooglePay from '../base/GooglePay';
// import { Link } from "react-router-dom";
// import {useLocation, useNavigate} from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { useEmail } from '../base/EmailContext';

// speciality
import sImg1 from "../images/s-img-1.jpg";
import sImg2 from "../images/s-img-2.jpg";
import sImg3 from "../images/s-img-3.jpg";
import sImg4 from "../images/s-img-4.jpg";
import sImg5 from "../images/s-img-5.jpg";
import sImg6 from "../images/s-img-6.jpg";
import s1 from "../images/s-1.png";
import s2 from "../images/s-2.png";
import s3 from "../images/s-3.png";
import s4 from "../images/s-4.png";
import s5 from "../images/s-5.png";
import s6 from "../images/s-6.png";
// import Flip from "react-reveal/Flip";
// import Fade from "react-reveal/Fade";
// import Tada from "react-reveal/Tada";

const Item = styled(Paper)(({ theme }) => ({
}));

function Home() {
  const { email } = useEmail();

  // const location=useLocation()
  // const email = location.state && location.state.email;

  const backgroundImageStyle = {
    backgroundImage: `url(${hbg})`,
    backgroundSize: "cover", // You can adjust these properties as needed
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

// Speciality
  const specialities = [
    {
      imageSrc: sImg1,
      iconSrc: s1,
      name: "tasty burger",
      description:
        "Indulge in the mouthwatering delight of our irresistible, juicy burger, a tantalizing symphony of flavors that will leave your taste buds dancing with delight.",
    },
    {
      imageSrc: sImg2,
      iconSrc: s2,
      name: "tasty pizza",
      description:
        "Savor the irresistible allure of our delectable pizza, topped with the finest ingredients and baked to perfection, delivering a slice of pure culinary bliss in every bite.",
    },
    {
      imageSrc: sImg3,
      iconSrc: s3,
      name: "cold ice-cream",
      description:
        "Delight in the frosty indulgence of our velvety ice cream, a heavenly treat that will send a delightful shiver down your spine with each cool, creamy spoonful.",
    },
    {
      imageSrc: sImg4,
      iconSrc: s4,
      name: "cold drinks",
      description:
        "Quench your thirst and refresh your senses with our icy-cold drinks, bursting with vibrant flavors and served in frosty perfection, making every sip a cool, satisfying escape from the heat.",
    },
    {
      imageSrc: sImg5,
      iconSrc: s5,
      name: "tasty sweets",
      description:
        "Embark on a delightful journey through our world of delectable sweets, where each bite is a symphony of flavors and a sweet escape from the ordinary.",
    },
    {
      imageSrc: sImg6,
      iconSrc: s6,
      name: "healthy breakfast",
      description:
        "Start your day with a mouthwatering and wholesome breakfast that not only tantalizes your taste buds but also fuels your body with the nourishment it deserves, setting the perfect tone for a vibrant morning ahead.",
    },
  ];
  return (
    <>
    <div className="home fb sec" id="home" style={{ ...backgroundImageStyle, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
    <div className="content">
      {/* <Fade bottom> */}
        <h3>food made with love</h3>
        {email && <h4>Welcome! {email}</h4>}
      {/* </Fade> */}
      {/* <Fade bottom> */}
        <p>
          "Food made with love is more than a meal; it's an expression of care
          and passion. It's a dish crafted with attention to detail and a
          sprinkle of affection, turning every bite into a heartwarming
          experience."
        </p>

        <p>
          We Provide a Table Reservation and online food delivery. it's a home delivery cash on payment.
        </p>
      {/* </Fade> */}
      {/* <Bounce> */}
      <Link to="/OrderFood">
        <h2 className="btn">
          order now
        </h2>
        </Link>
      {/* </Bounce> */}
    </div>
    {/* <Fade right> */}
      <div className="image">
        <img src={homeImg} alt="" />
      </div>
    {/* </Fade> */}
  </div>

  {/* Speciality */}
  <div className="speciality fb sec" id="speciality">
      {/* <Tada> */}
        <h1 className="heading">
          our <span>speciality</span>
        </h1>
      {/* </Tada> */}
        <div className="box-container">
      {/* <Fade bottom delay={500}> */}
          <div className="box">
            <img className="image" src={specialities[0].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[0].iconSrc} alt="" />
              <h3>{specialities[0].name}</h3>
              <p>{specialities[0].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={550}> */}

          <div className="box">
            <img className="image" src={specialities[1].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[1].iconSrc} alt="" />
              <h3>{specialities[1].name}</h3>
              <p>{specialities[1].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={600}> */}

          <div className="box">
            <img className="image" src={specialities[2].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[2].iconSrc} alt="" />
              <h3>{specialities[2].name}</h3>
              <p>{specialities[2].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={650}> */}

          <div className="box">
            <img className="image" src={specialities[3].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[3].iconSrc} alt="" />
              <h3>{specialities[3].name}</h3>
              <p>{specialities[3].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={700}> */}

          <div className="box">
            <img className="image" src={specialities[4].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[4].iconSrc} alt="" />
              <h3>{specialities[4].name}</h3>
              <p>{specialities[4].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        {/* <Fade bottom delay={750}> */}

          <div className="box">
            <img className="image" src={specialities[5].imageSrc} alt="" />
            <div className="content">
              <img src={specialities[5].iconSrc} alt="" />
              <h3>{specialities[5].name}</h3>
              <p>{specialities[5].description}</p>
            </div>
          </div>
        {/* </Fade> */}
        </div>
    </div>
    <MostPopular/>
    <HowItWorks/>
    <Review/>
  </>
  );
}

export default Home