import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCoordinators = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coordinators on page load
  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/coordinators",
        { withCredentials: true }
      );
      setCoordinators(res.data.coordinators);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Delete coordinator
  const deleteCoordinator = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coordinator?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/admin/coordinator/${id}`,
        { withCredentials: true }
      );

      // Remove from UI after delete
      setCoordinators(coordinators.filter((c) => c._id !== id));
      alert("Coordinator deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete coordinator");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Coordinators</h2>

      {loading ? (
        <p>Loading coordinators...</p>
      ) : coordinators.length === 0 ? (
        <p>No coordinators found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {coordinators.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <button
                    onClick={() => deleteCoordinator(c._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCoordinators;
