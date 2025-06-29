import express from 'express';
import Worker from '../models/Worker.js';
import {
  registerUser,
  loginUser,
  registerWorker,
  loginWorker,
  updateWorkerProfile,
  sendOTP,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/forgot-password/send-otp', sendOTP);
router.post('/forgot-password/reset', resetPassword);



// Routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

router.post('/worker/register', registerWorker);
router.post('/worker/login', loginWorker);
router.put('/worker/:id/profile', updateWorkerProfile);
// Example route
router.get('/worker/:id', async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return res.status(404).json({ success: false, msg: "Worker not found" });
  res.json({ success: true, worker });
});
// Get all workers
router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({ success: true, workers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
