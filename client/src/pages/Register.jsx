import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // default
    phone: '',
    pincode: '',
    category: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerRoute =  form.role === 'worker'
        ? 'http://localhost:5000/api/auth/worker/register'
        : 'http://localhost:5000/api/auth/user/register';

    try {
      const payload =
        form.role === 'worker'
          ? {
              name: form.name,
              email: form.email,
              password: form.password,
              address: form.address,
              phone: form.phone,
              pincode: form.pincode,
              category: form.category,
            }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
              address: form.address,
            };

      console.log("Sending to:", registerRoute);
      console.log("Payload:", payload);
      const res = await axios.post(registerRoute, payload);

      if (res.data.success) {
        alert('Registration successful! You can now log in.');
        navigate(form.role === 'worker' ? '/login/worker' : '/login/user');
      } else {
        alert(res.data.msg || 'Registration failed.');
      }
    } catch (err) {
  console.log(err.response?.data || err);
  alert('Something went wrong while registering.');
}
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="role-dropdown"
            required
          >
            <option value="user">User</option>
            <option value="worker">Worker</option>
          </select>

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          {/* Worker-specific fields */}
          {form.role === 'worker' && (
            <>
              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                required
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="maid">Maid</option>
                <option value="cook">Cook</option>
                <option value="tutor">Tutor</option>
                <option value="electrician">Electrician</option>
              </select>
            </>
          )}

          <button type="submit">Register</button>
          <p className="login-link">
              <h4>Already have an account?</h4>
              <br/> 
              <div className='lin'>
              <a href="/login/user">Login as user     </a>
              <span> | </span>
              <a href="/login/worker">    Login as worker</a>
              </div> 
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
