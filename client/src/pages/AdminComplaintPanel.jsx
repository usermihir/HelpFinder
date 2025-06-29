import React, { useEffect, useState } from 'react';

function AdminComplaintPanel() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/complaints');
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial' }}>
      <h2 style={{ marginBottom: '20px' }}>All User Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tdStyle}>{c.userId || 'N/A'}</td>
                <td style={tdStyle}>{c.title}</td>
                <td style={tdStyle}>{c.description}</td>
                <td style={tdStyle}>{new Date(c.date || c.createdAt).toLocaleString()}</td>
                <td style={tdStyle}>{c.status || 'pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left'
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  verticalAlign: 'top'
};

export default AdminComplaintPanel;
