import React, { useState, useEffect } from "react";
import "../App.css";
import orderImg from "../images/order-img.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Typography, Autocomplete } from "@mui/material";
import { useEmail } from "../base/EmailContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderFood() {
  const { email, setEmail } = useEmail();
  const{username,setUsername}=useState();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [foodItems, setFoodItems] = useState([{ name: "", quantity: 0, price: 0 }]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the API
    axios.get('http://localhost:3000/get-all-products')
      .then(response => {
        // Format menu items with 'label' property for Autocomplete
        const formattedMenuItems = response.data.map(item => ({ label: item.title, price: item.price }));
        setMenuItems(formattedMenuItems);
      })
      .catch(error => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      username,
      email,
      number,
      Address,
      date,
      time,
      foodItems,
    };

    // Send order data to the server
    axios.post("http://localhost:3000/talkOrder", orderData)
      .then((response) => {
        console.log("Order created:", response.data);
        // Display success dialog
        setOpen(true);
        // Reset form fields after successful submission
        setNumber("");
        setAddress("");
        setDate("");
        setTime("");
        setFoodItems([{ name: "", quantity: 0, price: 0 }]);

        // Send email
        const totalPrice = foodItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
                const emailData = {
          to: email, // or any other recipient email address
          subject: "New Order Submitted",
          text: "Your order has been successfully submitted.",
          html: `
        <p>Your order has been successfully submitted.</p>
        <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="border-bottom: 1px solid black;">
          <th style="border: 1px solid black; padding: 8px;">Food Name</th>
          <th style="border: 1px solid black; padding: 8px;">Quantity</th>
          <th style="border: 1px solid black; padding: 8px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${foodItems
          .map(
            (item) => `
          <tr style="border-bottom: 1px solid black;">
            <td style="border: 1px solid black; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid black; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid black; padding: 8px;">₹${item.price}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td style="border: 1px solid black; padding: 8px;" colspan="2"><b>Total Price:</b></td>
          <td style="border: 1px solid black; padding: 8px;">₹${totalPrice}</td>
        </tr>
      </tfoot>
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
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const handleAddItem = () => {
    setFoodItems([...foodItems, { name: "", quantity: 0, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index][field] = value;
  
    // Find the selected item from menuItems by comparing the 'label' property
    const selectedItem = menuItems.find((item) => item.label === value);
  
    if (selectedItem) {
      updatedFoodItems[index].price = selectedItem.price;
      // Update the quantity only if it's greater than zero
      updatedFoodItems[index].quantity = Math.max(updatedFoodItems[index].quantity, 1);
    }
  
    setFoodItems(updatedFoodItems);
  };

  return (
    <div className="order fb sec" id="order">
      <h1 className="heading">
        <span>order</span> now
      </h1>
      <div className="row">
        <div className="image">
          <img src={orderImg} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            {/* Input fields */}
            <TextField
              className="input"
              type="text"
              label="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="input"
              label="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
            />
            {/* Autocomplete for food items */}
            
              <TextField
              className="input"
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
               <TextField
               className="input"
                    label="Time"
                    variant="outlined"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              
            {foodItems.map((item, index) => (
              <div key={index} style={{ margin: "25px" }}>
                <Autocomplete
                  className="input"
                  options={menuItems}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, newValue) => handleItemChange(index, "name", newValue?.label || "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Food Name ${index + 1}`}
                      required
                      fullWidth
                    />
                  )}
                />
                <Typography sx={{ padding: "5px 10px", color: "blue" }}>
                  Price: Rs. {item.price}
                </Typography>
                <TextField
                  className="input"
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                  required
                  fullWidth
                />
              </div>
            ))}
          </div>
          {/* Add and submit buttons */}
          <Button
            className="btn"
            type="button"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handleAddItem}
          >
            Add Food
          </Button>
          <Button
            className="btn"
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          >
            Order Now
          </Button>
        </form>
        {/* Success dialog */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Check Your Orders:"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your Order is submitted successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default OrderFood;