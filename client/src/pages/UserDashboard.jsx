import React, { useEffect, useState } from 'react';
import './UserDashboard.css';

function UserDashboard({ userId = 'guest' }) {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [feedback, setFeedback] = useState({ rating: 5, comment: '', workerId: '', bookingId: '' });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const fetchUserBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/bookings');
      const data = await res.json();
      const userBookings = data.filter((b) => b.userId === userId);
      setBookings(userBookings);
    } catch (err) {
      console.error("Error fetching user bookings", err);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (res.ok) fetchUserBookings();
    } catch (err) {
      console.error("Error cancelling booking", err);
    }
  };

  const handleFeedbackClick = (booking) => {
    setFeedback({ rating: 5, comment: '', workerId: booking.workerId, bookingId: booking.id });
    setShowFeedbackForm(true);
  };

  const submitFeedback = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...feedback,
          userId,
          workerName: bookings.find(b => b.id === feedback.bookingId)?.workerName
        }),
      });
      if (res.ok) {
        alert('Feedback submitted');
        setShowFeedbackForm(false);
      }
    } catch (err) {
      console.error('Error submitting feedback', err);
    }
  };

  const filtered = filterStatus
    ? bookings.filter(b => b.status === filterStatus)
    : bookings;

  return (
    <div className="dashboard-container">
      <h2>My Bookings</h2>

      {/* Filter Section */}
      <div className="filter-bar">
        <label>Status: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Stats Summary */}
      <div className="summary-bar">
        <p>Total: {bookings.length}</p>
        <p>Active: {bookings.filter(b => b.status === 'pending').length}</p>
        <p>Cancelled: {bookings.filter(b => b.status === 'cancelled').length}</p>
      </div>

      {/* Booking List */}
      <ul className="booking-list">
        {filtered.map((b) => (
          <li key={b.id} className="booking-card">
            <p><strong>Worker:</strong> {b.workerName}</p>
            <p><strong>Type:</strong> {b.type}</p>
            <p><strong>Date:</strong> {new Date(b.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {b.status}</p>
            {b.status === 'pending' && (
              <button onClick={() => cancelBooking(b.id)} className="cancel-btn">Cancel</button>
            )}
            {b.status === 'completed' && (
              <button onClick={() => handleFeedbackClick(b)} className="feedback-btn">Give Feedback</button>
            )}
          </li>
        ))}
      </ul>

      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="feedback-modal">
          <h3>Submit Feedback</h3>
          <label>Rating: </label>
          <select value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}>
            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <textarea
            placeholder="Comment"
            value={feedback.comment}
            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
          />
          <button onClick={submitFeedback} className="submit-btn">Submit</button>
          <button onClick={() => setShowFeedbackForm(false)} className="close-btn">Close</button>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
