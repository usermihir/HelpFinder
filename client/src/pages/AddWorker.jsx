import React, { useState } from 'react';
import './AddWorker.css';

function AddWorker() {
  const [worker, setWorker] = useState({
    name: '',
    type: '',
    phone: '',
    address: '',
    experience: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending to backend:', worker);
    // TODO: send POST request to backend
  };

  return (
    <div className="add-worker-container">
      <h2>Add New Worker</h2>
      <form onSubmit={handleSubmit} className="add-worker-form">
        {['name', 'type', 'phone', 'address', 'experience'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={worker[field]}
            onChange={(e) => setWorker({ ...worker, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit">Add Worker</button>
      </form>
    </div>
  );
}

export default AddWorker;
