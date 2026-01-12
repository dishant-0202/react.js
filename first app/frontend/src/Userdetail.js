import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams(); // get id from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/users/${id}`);
        console.log("User detail:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!user) return <h2>User not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Detail</h2>

      <p><b>ID:</b> {user.id}</p>
      <p><b>First Name:</b> {user.firstname}</p>
      <p><b>Last Name:</b> {user.lastname}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>phoneno:</b> {user.phoneno}</p>
      <p><b>address:</b> {user.address}</p>
    </div>
  );
};


export default UserDetail;
