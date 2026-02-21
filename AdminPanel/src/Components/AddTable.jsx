import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
const AddTable = () => {
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isBooked, setIsBooked] = useState(false); // Assuming default value is false
  const [tables, setTables] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/create-table", {
        tableName,
        capacity,
        isBooked,
      });
      console.log("Table created successfully:", response.data);
      // Reset form fields after successful submission
      setTableName("");
      setCapacity("");
    } catch (error) {
      console.error("Error creating table:", error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-tables"
        );
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error.response.data.message);
      }
    };

    fetchTables();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: "100%", // Set width to 100%
                maxWidth: 400, // Max width for larger screens
                mt: 2, // Margin top
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Create Table
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Table Name"
                  variant="outlined"
                  fullWidth
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Capacity"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container sx={{ margin: "100px" }}>
        <Typography variant="h4" gutterBottom>
          All Tables:
        </Typography>
        <List>
          {tables.map((table) => (
            <ListItem key={table._id}>
              <ListItemText
                primary={`Table Name: ${table.tableName}`}
                secondary={`Capacity: ${table.capacity} | Booked: ${
                  table.isBooked ? "Yes" : "No"
                }`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AddTable;
