import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FoodOrderHistory from "../Components/FoodOrderHistory";
import ReservationHistory from "../Components/ReservationHistory";


function History() {
  const theme = useTheme();

  return (
    <Box sx={{ paddingTop:"100px"}}>
      <Typography sx={{ color: "black", fontSize: "30px", margin: "5px" }}>
        History:
      </Typography>

        <h2 style={{padding:"10px 10px"}} >FoodOrder history:</h2>
<FoodOrderHistory/>
      <h2 style={{padding:"10px 10px"}} >Reserve_Table history:</h2>
     <ReservationHistory/>
    </Box>
  );
}

export default History;
