import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import tableimg from "../images/table.jpg";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import { TextField, TextareaAutosize } from '@mui/material';
import { useEmail } from "../base/EmailContext";
import PartyHall from "./PartyHall";
import GooglePay from "../base/GooglePay";
import {Checkbox} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReservationCard = styled(Card)(({ theme }) => ({
  marginTop: "100px",
  width: "95vw", // Default width for small screens
  [theme.breakpoints.up("sm")]: {
    marginTop: "100px",
    width: "90vh", // Adjusted width for larger screens
  },
  margin: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
}));

const Reservation = () => {
  const { email, setEmail } = useEmail();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedTables, setSelectedTables] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [allTables, setAllTables] = useState([]);
  const [isDateTimeSet, setIsDateTimeSet] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [foodNames, setFoodNames] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handelSelectClose=()=>{
    setSelectOpen(false);
  }
  useEffect(() => {
    // Fetch food names from the backend API
    axios
      .get("http://localhost:3000/get-all-products")
      .then((response) => {
        // Extracting food names from the response data
        const names = response.data.map((product) => ({
          name: product.title,
          id: product._id,
        }));
        setFoodNames(names);
      })
      .catch((error) => {
        console.error("Error fetching food names:", error);
      });
  }, []);
  const handleFoodSelection = (foodId) => {
    const isSelected = selectedFood.includes(foodId);
    if (isSelected) {
      setSelectedFood(selectedFood.filter((id) => id !== foodId));
    } else {
      setSelectedFood([...selectedFood, foodId]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-all-tables")
      .then((response) => {
        setAllTables(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available tables:", error);
      });
  }, []);
  useEffect(() => {
    if (date && time) {
      // Assuming you have a state variable called 'time'
      axios
        .get(
          `http://localhost:3000/get-available-tables?date=${date}&time=${time}`
        )
        .then((response) => {
          setAllTables(response.data);
        })
        .catch((error) => {
          console.error("Error fetching available tables:", error);
        });
    }
  }, [date, time]); // Ensure 'time' is included in the dependency array


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Reservation.jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      email,
      name,
      number,
      // Extract table names from selectedTables array
      tables: selectedTables.map((table) => ({
        tableName: table.tableName,
        capacity: table.capacity,
        isBooked: table.isBooked,
      })),
      numberOfPeople,
      date,
      time,
      selectedFood,
    };
    axios
      .post("http://localhost:3000/reserve-table", reservationData)
      .then((response) => {
        setOpen(true);
        console.log("Reservation successful:", response.data);
        // Update the isBooked status of selected tables to true
        const updatedTables = allTables.map((table) => {
          if (
            selectedTables.some(
              (selectedTable) => selectedTable._id === table._id
            )
          ) {
            return { ...table, isBooked: true };
          } else {
            return table;
          }
        });
        setAllTables(updatedTables);
        setName("");
        setNumber("");
        setSelectedTables([]);
        setNumberOfPeople("");
        setDate("");
        setTime("");
        setIsDateTimeSet(false);

        const emailData = {
          to: email,
          subject: "Table Reservation Confirmation",
          text: "Your table reservation has been successfully submitted.",
          html: `
            <p>Your table reservation has been successfully submitted.</p>
            <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="border: 1px solid black; padding: 8px;">Name</td>
              <td style="border: 1px solid black; padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px;">Number</td>
              <td style="border: 1px solid black; padding: 8px;">${number}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px;">Number of People</td>
              <td style="border: 1px solid black; padding: 8px;">${numberOfPeople}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px;">Date</td>
              <td style="border: 1px solid black; padding: 8px;">${date}</td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px;">Time</td>
              <td style="border: 1px solid black; padding: 8px;">${time}</td>
            </tr>
          </table>
          `,
        };
        axios
          .post("http://localhost:3000/send-email", emailData)
          .then((res) => {
            console.log("Email sent:", res.data);
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
      }
    
    )
      
      .catch((error) => {
        console.error("Error making reservation:", error.response.data.message);
      });
      
  };
  const handleDateTimeChange = () => {
    setSelectOpen(true);
    setIsDateTimeSet(!isDateTimeSet); // Toggle the state of isDateTimeSet
  };


  return (
    <>
      <div
        style={{
          backgroundImage: `url(${tableimg})`,
          margin: "0px 0px",
          backgroundSize: "cover",
          height: "100vh",
          paddingTop: "100px",
        }}
      >
        <ReservationCard>
          <CardContent>
            <Typography variant="h4" className="heading">
              {" "}
              <span>Table</span> Reservation
            </Typography>
            <form onSubmit={handleSubmit}>
              {email && <h3>Email: {email}</h3>}
              <Grid container spacing={2}>
                {(!email || email === "") && (
                  <TextField
                    className="input"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginLeft: "15px" }}
                    required
                    fullWidth
                  />
                )}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Number of People"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    required
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                  />
                  <h5>Value must be lessthan or equal to 10</h5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date"
                    variant="outlined"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0], // Set min date to today
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Time"
                    variant="outlined"
                    type="time"
                    value={time}
                    onChange={(e) => {
                      const selectedTime = e.target.value;
                      // Ensure minutes are always set to 00
                      const formattedTime = selectedTime.slice(0, 2) + ":00"; // Keep only the hours and set minutes to 00
                      setTime(formattedTime);
                    }}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: "07:00", // Set min time to 7:00 AM
                      max: "23:00", // Set max time to 11:00 PM
                      step: 3600, // Set step to 1 hour (3600 seconds)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="btn"
                    variant="outline"
                    onClick={handleDateTimeChange}
                    disabled={!date || !time}
                    sx={{marginRight:"2px"}}
                  >
                    Select Table
                  </Button>
                  <Button className="btn" type="submit" variant="outline">
                    Reserve Table
                  </Button>
                  <Button className="btn" variant="outline">Cancel</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </ReservationCard>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{ color: "black", fontSize: "20px", fontWeight: "400" }}
          >
            {"Check Your Orders:"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ color: "black", fontSize: "15px" }}
            >
              Your Order is submitted successfully !
              <GooglePay />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontSize: "10px" }}>
              Done
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={selectOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handelSelectClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{ color: "black", fontSize: "20px", fontWeight: "400" }}
          >
            Select Tables:
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ color: "black", fontSize: "15px",maxHeight: "300px", overflowY: "scroll",width:"300px" }}
            >
             {isDateTimeSet && (
          <>
            {allTables.map((table) => (
               <div key={table._id}>
               <label>
                 <Checkbox
                   disabled={table.isBooked}
                   checked={selectedTables.some((t) => t._id === table._id)}
                   onChange={(e) => {
                     if (e.target.checked) {
                       setSelectedTables([...selectedTables, table]);
                     } else {
                       setSelectedTables(
                         selectedTables.filter((t) => t._id !== table._id)
                       );
                     }
                   }}
                 />
                 <span style={{ color: table.isBooked ? "red" : "inherit" }}>
                   {table.tableName}
                 </span>{" "}
                 - {table.capacity} seats
                 {table.isBooked && (
                   <span style={{ color: "red" }}> (Booked)</span>
                 )}
               </label>
             </div>
            ))}
           <h4> Foods (Optional):</h4>
            {foodNames.map((food) => (
                    <div key={food.id}>
                      <Checkbox
                        checked={selectedFood.includes(food.id)}
                        onChange={() => handleFoodSelection(food.id)}
                      />
                      <span>{food.name}</span>
                    </div>
                  ))}
          </>
        )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handelSelectClose} sx={{ fontSize: "10px" }}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <PartyHall /> */}
    </>
  );
};

export default Reservation;
