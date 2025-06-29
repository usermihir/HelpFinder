import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerDashboard.css';

function WorkerDashboard() {
  const [bookings, setBookings] = useState([]);
  const workerId = "1"; // Assume logged-in worker has ID "1"
  const [workerInfo, setWorkerInfo] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();

  const allWorkers = [
    {
      id: "0",
      name: "Rekha Devi",
      type: "maid",
      phone: "9876543210",
      address: "Bhubaneswar",
      experience: 4,
      location: { lat: 20.2961, lng: 85.8245 },
      availableDates: ["2025-06-24"]
    },
    {
      id: "1",
      name: "Sanjay Jha",
      type: "cook",
      phone: "9998877665",
      address: "Balasore",
      experience: 7,
      location: { lat: 21.4942, lng: 86.9318 },
      availableDates: ["2025-06-23"]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      // Load static worker info from dummy array
      const worker = allWorkers.find(w => w.id === workerId);
      setWorkerInfo(worker);
      setAvailableDates(worker.availableDates || []);

      // Fetch bookings
      const res = await fetch('http://localhost:5000/api/bookings');
      const data = await res.json();
      const myBookings = data.filter(b => b.workerId === workerId);
      setBookings(myBookings);
    };
    fetchData();
  }, [workerId]);

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleAvailabilityChange = (e) => {
    const newDate = e.target.value;
    if (!availableDates.includes(newDate)) {
      setAvailableDates([...availableDates, newDate]);
    }
  };

  const removeDate = (dateToRemove) => {
    setAvailableDates(availableDates.filter(date => date !== dateToRemove));
  };

  return (
   <div className="worker-dashboard">
      <h2 className="dashboard-title">Worker Dashboard</h2>
       <button onClick={() => navigate('/worker/create-profile')}>
  Complete My Profile
</button>
      {workerInfo && (
        <div className="profile-section">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {workerInfo.name}</p>
          <p><strong>Type:</strong> {workerInfo.type}</p>
          <p><strong>Phone:</strong> {workerInfo.phone}</p>
          <p><strong>Address:</strong> {workerInfo.address}</p>
        </div>
      )}

      <div className="bookings-section">
        <h3>My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="booking-card">
              <p><strong>User:</strong> {b.userId}</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {b.status}</p>
              {b.status === 'pending' && (
                <div className="action-buttons">
                  <button className="accept-btn" onClick={() => updateStatus(b.id, 'accepted')}>Accept</button>
                  <button className="reject-btn" onClick={() => updateStatus(b.id, 'rejected')}>Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="availability-section">
        <h3>Manage Available Dates</h3>
        <input type="date" onChange={handleAvailabilityChange} className="date-input" />
        <ul className="date-list">
          {availableDates.map((date, idx) => (
            <li key={idx}>
              {date} <button className="remove-btn" onClick={() => removeDate(date)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkerDashboard;
