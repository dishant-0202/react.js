
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Userlist = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/users");
        console.log("Users:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  // Handlers
  const handleView = (user) => {
    alert(`Viewing user: ${user.firstname} ${user.lastname}`);
    navigate(`/users/${user.id}`);
  };

  const handleLogout = () => {
    alert("Logged out");
    // clear token/session here
  };

  return (
    <div style={{ padding: "20px", background: "#f3f4f6", minHeight: "100vh" }}>
      {/* ===== TITLE BAR ===== */}
      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2>User Management</h2>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              background: "#1e40af",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Menu ▼
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "5px",
                width: "120px",
              }}
            >
              <div
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={() => alert("Self")}
              >
                Self
              </div>
              <div
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== USER TABLE ===== */}
      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{ background: "white", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#e5e7eb" }}>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => handleView(user)}
                    style={{
                      background: "#22c55e",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    
                    <Link to="/Userdetail">view</Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;