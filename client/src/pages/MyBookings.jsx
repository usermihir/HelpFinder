import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = "guest"; // You can later replace with actual logged-in user ID

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        const data = await res.json();
        const myBookings = data.filter(b => b.userId === userId);
        setBookings(myBookings);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Worker:</strong> {b.workerName} ({b.type})</p>
            <p><strong>Phone:</strong> {b.phone}</p>
            <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
