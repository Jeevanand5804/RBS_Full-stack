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
  IconButton
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

function ReservationHistory() {
    const [reserves, setReserves] = useState([]);
    const [editReserveForm, setEditReserveForm] = useState({
      number: "",
      tables: "",
      numberOfPeople: "",
      date: "",
      time: "",
      });
      const [isEditFormOpen, setIsEditFormOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState("");
  
    const fetchreserves = async () => {
      try {
        const response = await axios .get(`http://localhost:3000/getAllReservation`);
        setReserves(response.data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    };
  
    useEffect(() => {
      fetchreserves();
    }, []);
    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:3000/deleteReserve/${id}`)
          .then(() => {
            setReserves((prevreserves) =>
              prevreserves.filter((reserve) => reserve._id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting reserve:", error);
          });
      };
    
      const handleEdit = (reserve) => {
        setEditReserveForm({
          reserveid: reserve._id,
          number: reserve.number,
          numberOfPeople: reserve.numberOfPeople,
          date: reserve.date,
          time:reserve.time,
        });
        setIsEditFormOpen(true);
      };
    
      const handleEditSubmit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3000/editReserve/${editReserveForm.reserveid}`, editReserveForm)
          .then(() => {
            // Update the reserves state with the edited reserve
            const updatedreserves = reserves.map((reserve) => {
              if (reserve._id === editReserveForm.reserveid) {
                return {
                  ...reserve,
                  number: editReserveForm.number,
                  numberOfPeople: editReserveForm.numberOfPeople,
                  date: editReserveForm.date,
                  time: editReserveForm.time,
                };
              }
              return reserve;
            });
            setReserves(updatedreserves);
            // Close the edit form modal
            handleEditFormClose();
          })
          .catch((error) => {
            console.error("Error updating reserve:", error);
          });
      };
      
    
      const handleEditFormClose = () => {
        setIsEditFormOpen(false);
        setEditReserveForm({
          reserveid: "",
          number: "",
          numberOfPeople: "",
          date: "",
          time:"",
        });
      };
   // Filter reserves based on search term (email or number)
   // Filter reserves based on search term (email or number)
   const filteredReserves = reserves.filter((reserve) =>
    reserve.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reserve.number.toString().includes(searchTerm)
  );

  // Function to handle searching
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const reversedReserves = [...filteredReserves].reverse();

  return (
    <Box sx={{ padding: "0 50px", fontSize: "20px" ,marginBottom:"40%"}}>
       <TextField
    label="Search by Email or Number"
    fullWidth
    margin="normal"
    value={searchTerm}
    onChange={handleSearch}
    sx={{marginBottom:"50px",width:"500px"}}
/>
   <Grid container spacing={2}>
    {reversedReserves.length > 0 ? (
          reversedReserves.map((reserve) => (
            <Card
              sx={{
                margin: "5px 10px",
                boxShadow: "3px 2px 5px",
                backgroundColor: "whitesmoke",
                fontSize: "20px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  <b>Reservation Details:</b>
                </Typography>
                <Divider sx={{ margin: "5px" }} />
                <Typography sx={{ fontSize: "15px" }}>
                <b>Email :</b> {reserve.email}
              </Typography>
              <Divider sx={{ margin: "5px" }} />
                <Typography>
                  <b>Name         : </b> {reserve.name}
                </Typography>
                <Divider sx={{ margin: "5px" }} />
                <Typography>
                  <b>Number       : </b> {reserve.number}
                </Typography>
                <Divider sx={{ margin: "5px" }} />
                <Typography>
                  <b>No. of People: </b> {reserve.numberOfPeople}
                </Typography>
                <Divider sx={{ margin: "5px" }} />
                <Typography>
                  <b>Date         : </b> {new Date(reserve.date).toISOString().split('T')[0]}
                </Typography>
                <Divider sx={{ margin: "5px" }} />
                <Typography>
                  <b>Time         : </b> {reserve.time}
                </Typography>
                <>
                  {reserve.tables && reserve.tables.length > 0 && (
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
                              Table Name
                            </th>
                            <th
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              Capacity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {reserve.tables.map((table, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                {table.tableName}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "8px",
                                }}
                              >
                                {table.capacity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </>

                <Typography>
                  <b>Booked time:</b>{" "}
                  {new Date(reserve.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  fontSize: "15px",
                  marginBottom: "2px",
                  float: "left",
                  marginLeft:"200px"
                }}
                onClick={() => handleEdit(reserve)}
              >
                Edit
              </Button>
             
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  float: "right",
                  fontSize: "15px",
                  margin: "2px",
                  marginBottom: "2px",
                }}
                onClick={() => handleDelete(reserve._id)}
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
            No reservations are available
          </Typography>
        )}
      </Grid>

    <Modal
        open={isEditFormOpen}
        onClose={handleEditFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignfoodItems: "center",
          justifyContent: "center",
          height:"65vh",
          marginTop:"50px"
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
          <Typography variant="h6">Edit Reservation</Typography>
          <form onSubmit={handleEditSubmit}>

            <TextField
              label="Number"
              fullWidth
              margin="normal"
              name="Number"
              value={editReserveForm.number}
              onChange={(e) =>
                setEditReserveForm({ ...editReserveForm, number: e.target.value })
              }
            />
 <TextField
              label="Number of People"
              fullWidth
              margin="normal"
              name="NumberOfPeople"
              value={editReserveForm.numberOfPeople}
              onChange={(e) =>
                setEditReserveForm({ ...editReserveForm, numberOfPeople: e.target.value })
              }
            />
 <TextField
              label="Date"
              fullWidth
              margin="normal"
              name="date"
              value={editReserveForm.date}
              onChange={(e) =>
                setEditReserveForm({ ...editReserveForm, date: e.target.value })
              }
            />

            <TextField
              label="Time"
              fullWidth
              margin="normal"
              name="time"
              sx={{marginBottom:"50px"}}
              value={editReserveForm.time}
              onChange={(e) =>
                setEditReserveForm({ ...editReserveForm, time: e.target.value })
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
  </Box>
  )
}

export default ReservationHistory