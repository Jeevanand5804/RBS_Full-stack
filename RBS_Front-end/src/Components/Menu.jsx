import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid,Card,CardContent,Typography,Button, } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css"
function Menu() {
  const [images, setImages] = useState([]);

  const fetchImage = async () => {
    try {
        const response = await axios.get('http://localhost:3000/get-all-products');
        setImages(response.data);
    } catch (error) {
        console.error("Error fetching Data:", error);
    }
};

useEffect(() => {
    fetchImage();
}, []);

  return (
    <div className="Menu fb sec" id="Menu">
      <h1 className="heading">
        our food <span>Menu</span>
      </h1>

      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <img src={image.productImage} alt={image.description} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">Name: {image.title}</Typography>
                <Typography variant="h5" color="textPrimary">Description: {image.description}</Typography>
                {image.price && <Typography variant="h6" color="blue" className="price">Price: {image.price}</Typography>}
              </CardContent>
              <Link to="/OrderFood">
              <Button variant="outline" sx={{margin:"5px"}} className="btn">
                Order Now
              </Button>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Menu;
