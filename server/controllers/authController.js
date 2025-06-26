import User from '../models/User.js';
import Worker from '../models/Worker.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const otpStore = {};



export const sendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const worker = await Worker.findOne({ email });

  if (!user && !worker) {
    return res.status(404).json({ success: false, message: 'No account found with this email' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // 10 mins

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'OTP for Password Reset',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`
  });

  res.json({ success: true, message: 'OTP sent to your email' });
};


// 2️⃣ Reset password with OTP
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const record = otpStore[email];
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findOne({ email });
  const worker = await Worker.findOne({ email });

  if (user) {
    await User.updateOne({ email }, { password: hashedPassword });
  } else if (worker) {
    await Worker.updateOne({ email }, { password: hashedPassword });
  } else {
    return res.status(404).json({ success: false, message: 'Account not found' });
  }

  delete otpStore[email];
  res.json({ success: true, message: 'Password reset successful' });
};


export const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;
     console.log("Incoming user data:", req.body);
  
   if (!name || !email || !password || !address) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
    });

res.status(201).json({ success: true, message: 'Registered successfully' });
  } catch (err) {
     if (err.code === 11000) {
  return res.status(400).json({ success: false, msg: "Email already exists" });
}
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming login email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Add 'success: true' to indicate login success
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const registerWorker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      category,
      phone,
      pincode,
    } = req.body;

    console.log('Worker registration payload:', req.body);

    // Check for existing worker with same email
    const existing = await Worker.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = new Worker({
      name,
      email,
      password: hashedPassword,
      address,
      category,
      phone,
      pincode,
    });

    await worker.save();
    res.status(201).json({ success: true, msg: "Worker registered successfully" });
  } catch (err) {
    console.error("Worker Register Error:", err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if worker exists
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(404).json({ success: false, msg: 'Worker not found' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }

    // 3. Generate token (optional if you use JWT)
    const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET || 'your_secret', {
      expiresIn: '7d',
    });

    // 4. Respond with token and worker info
    res.status(200).json({
      success: true,
      msg: 'Login successful',
      token,
      user: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        address: worker.address,
      },
    });

  } catch (err) {
    console.error('Worker Login Error:', err);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

export const updateWorkerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const worker = await Worker.findByIdAndUpdate(id, updateData, { new: true });

    if (!worker) {
      return res.status(404).json({ success: false, msg: "Worker not found" });
    }

    res.json({ success: true, msg: "Profile updated", worker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};