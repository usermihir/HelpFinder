import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function WorkerProfiles() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/worker/${id}`);
        console.log("Worker API response:", res.data);
        setWorker(res.data.worker);
      } catch (err) {
        console.error('Failed to fetch worker:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!worker) return <p>No profile found.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>{worker.name}'s Profile</h2>
      <p>Email: {worker.email}</p>
      <p>Category: {worker.category}</p>
      <p>Phone: {worker.phone}</p>
      <p>Address: {worker.address}</p>

      {/* Buttons Section */}
      <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button style={btnStyle}>Requests</button>
      </div>
    </div>
  );
}

// Simple Button Styling
const btnStyle = {
  padding: "10px 16px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "#fff"
};

export default WorkerProfiles;
