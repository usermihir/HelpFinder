import React, { useState } from 'react';
import './ContactSupport.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactSupport() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Complaint submitted!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert(data.message || 'Error submitting complaint.');
    }
  };

  return (<>
      <Navbar/>
   <div className="contact-wrapper">
  <div className="contact-card">
    <h2>Contact Support</h2>
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
  <Footer/>
</>
  );
}

export default ContactSupport;
