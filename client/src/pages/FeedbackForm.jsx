import React, { useState } from 'react';

function FeedbackForm() {
  const [workerName, setWorkerName] = useState('');
  const [userId] = useState(localStorage.getItem("userId") || "guest");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerName, userId, rating, comments }),
    });
    const data = await res.json();
    alert(data.message || 'Feedback submitted!');
    setWorkerName('');
    setRating(5);
    setComments('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Leave Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Worker Name"
          value={workerName}
          onChange={(e) => setWorkerName(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="4"
          style={{ display: 'block', marginBottom: '10px', width: '300px' }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
