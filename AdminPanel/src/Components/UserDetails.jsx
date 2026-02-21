import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Import the CSS file

function UserDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/deleteUser/${userId}`);
      // After deleting the user, fetch the updated list of users
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="table-container" style={{ margin: "100px" }}>
      <h1>User Details</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Username</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                <button style={{ backgroundColor: "red", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
