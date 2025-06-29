import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const workerRes = await fetch('http://localhost:5000/api/workers');
      const bookingRes = await fetch('http://localhost:5000/api/bookings');
      setWorkers(await workerRes.json());
      setBookings(await bookingRes.json());
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    alert(`Status updated to ${data.booking.status}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>

      <h3>All Workers</h3>
      <ul>
        {workers.map((worker, i) => (
          <li key={i}>
            <b>{worker.name}</b> - {worker.type}, 📞 {worker.phone}
          </li>
        ))}
      </ul>

      <h3>All Bookings</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            <b>{b.workerName}</b> booked by <b>{b.userId}</b> on {new Date(b.date).toLocaleString()} — 
            <b> Status:</b> {b.status}
            <select
              onChange={(e) => handleStatusChange(b.id, e.target.value)}
              value={b.status}
              style={{ marginLeft: '10px' }}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
