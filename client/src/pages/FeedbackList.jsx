import React, { useEffect, useState } from 'react';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/feedbacks');
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {feedbacks.map((fb) => (
            <li key={fb.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <h4>{fb.workerName}</h4>
              <p><strong>Rating:</strong> {fb.rating} ⭐</p>
              <p><strong>Comment:</strong> {fb.comment}</p>
              <p><small>By: {fb.userId}</small></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;
