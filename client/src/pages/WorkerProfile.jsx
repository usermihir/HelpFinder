import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './WorkerProfile.css'

function WorkerProfile() {
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
    <div className="worker-profile-container">
  <h2>{worker.name}'s Profile</h2>
  <p>Email: {worker.email}</p>
  <p>Category: {worker.category}</p>
  <p>Phone: {worker.phone}</p>
  <p>Address: {worker.address}</p>

  <div className="profile-buttons">
    <button className="profile-button">Book Request</button>
    <a href={`mailto:${worker.email}`} className="profile-button">Send Mail</a>
  </div>
</div>
  );
}

export default WorkerProfile;
