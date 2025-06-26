import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => console.error(err));

app.get('/api/workers', (req, res) => {
  res.json(workers);  // returns the array with location fields
});

app.use((req, res, next) => {
  console.log(`🔥 ${req.method} ${req.url}`);
  next();
});


// In-memory storage for demo purposes
let bookingStore = [];
const workers = [
  {
    id: "0",
    name: "Rekha Devi",
    type: "maid",
    phone: "9876543210",
    address: "Bhubaneswar",
    experience: 4,
    availableDates: ["2025-06-24"],
    location: {
      lat: 20.2961,
      lng: 85.8245
    }
  },
  {
    id: "1",
    name: "Sanjay Jha",
    type: "cook",
    phone: "9998877665",
    address: "Balasore",
    experience: 7,
    availableDates: ["2025-06-23"],
    location: {
      lat: 21.4942,
      lng: 86.9318
    }
  }
];






app.post('/api/bookings', (req, res) => {
  const { workerId, userId, date, status } = req.body;
  const worker = workers.find(w => w.id === workerId);

  if (!worker) {
    return res.status(404).json({ message: "Worker not found" });
  }

 const booking = {
  id: Date.now().toString(), // unique booking ID
  workerId,
  workerName: worker.name,
  type: worker.type,
  phone: worker.phone,
  userId,
  date,
  status
};

  bookingStore.push(booking);
  console.log('Received booking:', booking);
  res.status(201).json({ message: 'Booking stored' });
});

app.patch('/api/bookings/:id', (req, res) => {
  const booking = bookingStore.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  booking.status = req.body.status;
  res.json({ message: 'Status updated', booking });
});


app.get('/api/bookings', (req, res) => {
  res.json(bookingStore);
});


let feedbackStore = [
  {
    id: "f1",
    workerId: "0",
    workerName: "Rekha Devi",
    rating: 4,
    comment: "Very punctual and hardworking.",
    userId: "guest",
  },
  {
    id: "f2",
    workerId: "1",
    workerName: "Sanjay Jha",
    rating: 5,
    comment: "Excellent cook!",
    userId: "guest",
  }
];

app.get('/api/feedbacks', (req, res) => {
  res.json(feedbackStore);
});

app.post('/api/feedbacks', (req, res) => {
  const { workerId, workerName, rating, comment, userId } = req.body;
  const newFeedback = {
    id: Date.now().toString(),
    workerId,
    workerName,
    rating,
    comment,
    userId
  };
  feedbackStore.push(newFeedback);
  res.status(201).json({ message: 'Feedback submitted', feedback: newFeedback });
});

let complaintStore = [];

app.post('/api/complaints', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const complaint = {
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  complaintStore.push(complaint);
  res.status(201).json({ message: 'Complaint submitted', complaint });
});

app.get('/api/complaints', (req, res) => {
  res.json(complaintStore);
});
