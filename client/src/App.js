import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AddWorker from './pages/AddWorker.jsx';
import WorkerList from './pages/WorkerList.jsx';
import WorkerProfile from './pages/WorkerProfile.jsx';
import BookingRequests from './pages/BookingRequests.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import WorkerDashboard from './pages/WorkerDashboard';
import EditWorkerProfile from './pages/EditWorkerProfile';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';
import FeedbackForm from './pages/FeedbackForm';
import FeedbackList from './pages/FeedbackList';
import AboutHelp from './pages/AboutHelp';
import ContactSupport from './pages/ContactSupport';
import AdminComplaintPanel from './pages/AdminComplaintPanel';
import HomePage from './pages/HomePage.jsx';
import Services from './pages/Services';
import FAQSection from './pages/FAQSection';
import CreateProfile from './pages/CreateProfile';
import ForgotPassword from './pages/ForgotPassword';
import WorkerProfiles from './pages/WorkerProfile1.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login/user" element={<Login userType="user" />} />
        <Route path="/login/worker" element={<Login userType="worker" />} />      
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/add-worker" element={<AddWorker />} />
        <Route path="/workers" element={<WorkerList />} />
        <Route path="/user/profile/:id" element={<WorkerProfile />} />
        <Route path="/worker/profile/:id" element={<WorkerProfiles />} />
        <Route path="/admin/bookings" element={<BookingRequests />} />
        <Route path="/dashboard" element={<UserDashboard userId="guest" />} />
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/edit-profile" element={<EditWorkerProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
        <Route path="/about" element={<AboutHelp />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<FAQSection />} />
        <Route path="/admin/complaints" element={<AdminComplaintPanel />} />
        <Route path="/worker/create-profile" element={<CreateProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
