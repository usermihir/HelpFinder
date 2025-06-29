import React, { useEffect, useState } from 'react';

function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('');
 const filteredRequests = filter
  ? requests.filter(req => req.status === filter)
  : requests;


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) throw new Error('Failed to update');

    const updatedBooking = await res.json();

    // update UI state
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  } catch (err) {
    console.error('Status update failed:', err);
  }
};


  return (
    <div style={{ maxWidth: '800px', margin: '30px auto' }}>
      <h2>Booking Requests</h2>
      <select onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: '20px' }}>
  <option value="">All</option>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="rejected">Rejected</option>
</select>

      <ul>
  {filteredRequests.map((req, index) => (
    <li key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <p><strong>Worker:</strong> {req.workerName} ({req.type})</p>
      <p><strong>Phone:</strong> {req.phone}</p>
      <p><strong>User ID:</strong> {req.userId}</p>
      <p><strong>Date:</strong> {new Date(req.date).toLocaleString()}</p>
      <p><strong>Status:</strong> {req.status}</p>

      {req.status === 'pending' && (
        <>
          <button onClick={() => updateStatus(req.id, 'approved')}>✅ Approve</button>
          <button onClick={() => updateStatus(req.id, 'rejected')}>❌ Reject</button>
        </>
      )}
    </li>
  ))}
</ul>

    </div>
  );
}

export default BookingRequests;
