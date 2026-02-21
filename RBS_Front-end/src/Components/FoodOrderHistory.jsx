import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  Modal,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useEmail } from "../base/EmailContext";

function FoodOrderHistory() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [editFormData, setEditFormData] = useState({
    orderid: "",
    number: "",
    foodItems: [],
    // foodName: "",
    Address: "",
    date: "",
    time: "",
  });
  const { email } = useEmail(); // Get the currently logged-in user's email
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getOrdersByEmail/${email}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteOrder/${id}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const handleEdit = (order) => {
    setEditFormData({
      orderid: order._id,
      number: order.number,
      foodItems: order.foodItems,
      Address: order.Address,
      date: order.date,
      time: order.time,
    });
    setIsEditFormOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/editOrder/${editFormData.orderid}`,
        editFormData
      )
      .then(() => {
        // Update the orders state with the edited order
        const updatedOrders = orders.map((order) => {
          if (order._id === editFormData.orderid) {
            return {
              ...order,
              number: editFormData.number,
              foodItems: editFormData.foodItems,
              Address: editFormData.Address,
              date: editFormData.date,
              time: editFormData.time,
            };
          }
          return order;
        });
        setOrders(updatedOrders);
        // Close the edit form modal
        handleEditFormClose();
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const handleEditFormClose = () => {
    setIsEditFormOpen(false);
    setEditFormData({
      orderid: "",
      number: "",
      foodItems: [],
      // foodName: "",
      Address: "",
      date: "",
      time: "",
    });
  };
  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    order.foodItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
   // Function to check if 10 minutes have passed since the booked time
   const isTimeExpired = (bookedTime) => {
    const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 minutes in milliseconds
    const currentTime = new Date();
    const bookedTimeDate = new Date(bookedTime);
    const difference = currentTime - bookedTimeDate;
    return difference > tenMinutesInMilliseconds;
  };
  return (
    <>
      <Box sx={{ padding: "0 50px", fontSize: "20px", marginBottom: "3%" }}>
        <Grid container spacing={2}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card
                sx={{
                  margin: "5px 10px",
                  boxShadow: "3px 2px 5px",
                  backgroundColor: "whitesmoke",
                  fontSize: "20px",
                }}
              >
                <CardContent>
                  {/* <Divider sx={{ margin: "5px" }} /> */}
                  <Typography sx={{ fontSize: "15px" }}>
                    <b>Number :</b> {order.number}
                  </Typography>
                  <Divider sx={{ margin: "5px" }} />
                  <Typography sx={{ fontSize: "15px" }}>
                    <b>Address :</b> {order.Address}
                  </Typography>
                  <Divider sx={{ margin: "5px" }} />
                  <Typography sx={{ fontSize: "15px" }}>
                   <b>Date :</b> {new Date(order.date).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ margin: "5px" }} />
                  <Typography sx={{ fontSize: "15px" }}>
                    <b>Time :</b> {order.time}
                  </Typography>
                  {order.foodItems && order.foodItems.length > 0 && (
                    <>
                      <Divider sx={{ margin: "10px 0" }} />
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              Food Name
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              Quantity
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.foodItems.map((item, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                {item.name}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                {item.quantity}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                ₹{item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                              colSpan="2"
                            >
                              <b>Total Price:</b>
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              ₹{calculateTotalPrice(order)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}
                  <Typography sx={{ fontSize: "15px" }}>
                    <b>Created At:</b>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <EditIcon
                  sx={{
                    color: "blue",
                    marginLeft: "150px",
                    fontSize: "23px",
                    display: { xs: "block", sm: "none" },
                    float: "left",
                  }}
                  onClick={() => handleEdit(order)}
                  disabled={isTimeExpired(order.createdAt)}
                />
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    marginLeft: "350px",
                    fontSize: "15px",
                    marginBottom: "2px",
                    display: { xs: "none", sm: "block" },
                    float: "left",
                  }}
                  onClick={() => handleEdit(order)}
                  disabled={isTimeExpired(order.createdAt)}
                >
                  Edit
                </Button>
                <DeleteOutlineIcon
                  sx={{
                    color: "red",
                    float: "right",
                    fontSize: "23px",
                    marginLeft: "5px  ",
                    display: { xs: "block", sm: "none" },
                  }}
                  onClick={() => handleDelete(order._id)}
                  disabled={isTimeExpired(order.createdAt)}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    float: "right",
                    fontSize: "15px",
                    margin: "2px",
                    display: { xs: "none", sm: "block" },
                  }}
                  onClick={() => handleDelete(order._id)}
                  disabled={isTimeExpired(order.createdAt)}
                >
                  Cancel
                </Button>
              </Card>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ margin: "10px", color: "black", fontSize: "20px" }}
            >
              No Orders are available
            </Typography>
          )}
        </Grid>
      </Box>
      <Modal
        open={isEditFormOpen}
        onClose={handleEditFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignfoodItems: "center",
          justifyContent: "center",
          height: "65vh",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "500px",
            alignfoodItems: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h6">Edit Order</Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Number"
              fullWidth
              margin="normal"
              name="Number"
              value={editFormData.number}
              onChange={(e) =>
                setEditFormData({ ...editFormData, number: e.target.value })
              }
            />

            {editFormData.foodItems.map((item, index) => (
              <div key={index}>
                <TextField
                  label={`Food Name ${index + 1}`}
                  fullWidth
                  margin="normal"
                  name={`FoodName${index}`}
                  value={item.name}
                  onChange={(e) => {
                    const newFoodItems = [...editFormData.foodItems];
                    newFoodItems[index].name = e.target.value;
                    setEditFormData({
                      ...editFormData,
                      foodItems: newFoodItems,
                    });
                  }}
                />
                <TextField
                  label={`Quantity ${index + 1}`}
                  fullWidth
                  margin="normal"
                  name={`Quantity${index}`}
                  value={item.quantity}
                  onChange={(e) => {
                    const newFoodItems = [...editFormData.foodItems];
                    newFoodItems[index].quantity = e.target.value;
                    setEditFormData({
                      ...editFormData,
                      foodItems: newFoodItems,
                    });
                  }}
                />
                {/* Add similar TextField components for other fields */}
              </div>
            ))}

            <TextField
              label="Address"
              fullWidth
              margin="normal"
              name="Address"
              sx={{ marginBottom: "50px" }}
              value={editFormData.Address}
              onChange={(e) =>
                setEditFormData({ ...editFormData, Address: e.target.value })
              }
            />
             <TextField
              label="Date"
              fullWidth
              margin="normal"
              name="Date"
              sx={{ marginBottom: "50px" }}
              value={editFormData.date}
              onChange={(e) =>
                setEditFormData({ ...editFormData, date: e.target.value })
              }
            />
             <TextField
              label="Time"
              fullWidth
              margin="normal"
              name="Time"
              sx={{ marginBottom: "50px" }}
              value={editFormData.time}
              onChange={(e) =>
                setEditFormData({ ...editFormData, time: e.target.value })
              }
            />
            {/* Add similar TextField components for other fields */}
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              sx={{ marginBottom: "5px", float: "right" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEditFormClose}
              sx={{ marginBottom: " 5px", float: "right", marginRight: "5px" }}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default FoodOrderHistory;
