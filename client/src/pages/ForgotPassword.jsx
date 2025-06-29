import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  // Timer for expiration alert
  useEffect(() => {
    if (otpSent && otpExpiresAt) {
      const interval = setInterval(() => {
        const timeLeft = Math.floor((otpExpiresAt - Date.now()) / 1000);
        if (timeLeft <= 0) {
          alert('OTP expired. Please request again.');
          setOtpSent(false);
          setOtp('');
          setOtpVerified(false);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, otpExpiresAt]);

 const handleSendOtp = async () => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:5000/api/auth/forgot-password/send-otp", { email });
    if (res.data.success) {
      setOtpSent(true);
      setOtpExpiresAt(Date.now() + 10 * 60 * 1000); // 10 minutes
      alert('OTP sent! It will expire in 10 minutes.');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Error sending OTP');
  } finally {
    setLoading(false);
  }
};


  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password/reset", {
        email,
        otp,
        newPassword: '__verify_only__' // dummy password for verification
      });
      if (res.data.success) {
        setOtpVerified(true);
        alert('OTP verified! Now enter new password.');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password/reset", {
        email,
        otp,
        newPassword: password
      });
      if (res.data.success) {
        alert('Password reset successful');
        navigate('/login/user');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={otpSent}
        />

        {otpSent && !otpVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {!otpSent && (
  loading ? (
    <div className="loader"></div> // You can also use text like: <p>Sending OTP...</p>
  ) : (
    <button onClick={handleSendOtp}>Send OTP</button>
  )
)}


        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
