import { useState  } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ userType }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRoute =
      userType === 'worker'
        ? 'http://localhost:5000/api/auth/worker/login'
        : 'http://localhost:5000/api/auth/user/login';

    try {
      const res = await axios.post(loginRoute, form);

      if (res.data.success) {
        // Save user data
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);           // Store JWT token
        localStorage.setItem('role', userType);  

        // Redirect to dashboard
        if (userType === 'worker') {
          navigate(`/worker/profile/${res.data.user.id}`);
        } else {
          navigate('/workers');
        }
      } else {
        alert(res.data.msg || 'Login failed. Please try again.');
      }
    } catch (err) {
      // If user not found or API throws error
      alert('Account not found. Please register first.');
      navigate('/register');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{userType === 'worker' ? 'Worker Login' : 'User Login'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
          <Link to="/forgot-password" className='pass'>Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
