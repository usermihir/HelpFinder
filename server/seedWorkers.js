import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: String,
  category: String,
  password: { type: String, default: 'hashed_password' },
  phone: String,
  email: String,
  address: String,
  pincode: String,
  experience: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  image: String,
  idProof: String,
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  location: {
    lat: Number,
    lng: Number,
  },
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);

// ⚠️ Replace this with your actual connection string
const MONGO_URI = 'mongodb://localhost:27017/verifiedHelpApp';

const workers = [
  {
    name: "Anjali Roy", category: "tutor", phone: "9876543210", email: "anjali@edu.com",
    address: "Sector 5, Kolkata", pincode: "700091", location: { lat: 22.5792, lng: 88.428 }
  },
  {
    name: "Bikash Mahato", category: "maid", phone: "9812345678", email: "bikash@maid.in",
    address: "Patia, Bhubaneswar", pincode: "751024", location: { lat: 20.353, lng: 85.8186 }
  },
  {
    name: "Meena Sharma", category: "cook", phone: "9876543299", email: "meena@cook.in",
    address: "Malviya Nagar, Delhi", pincode: "110017", location: { lat: 28.5378, lng: 77.251 }
  },
  {
    name: "Rajeev Das", category: "tutor", phone: "9988776655", email: "rajeev@tutor.edu",
    address: "Kharagpur", pincode: "721301", location: { lat: 22.346, lng: 87.2319 }
  },
  {
    name: "Sita Devi", category: "maid", phone: "9900990088", email: "sita@homehelp.in",
    address: "Koramangala, Bangalore", pincode: "560034", location: { lat: 12.9352, lng: 77.6245 }
  },
  {
    name: "Alok Mishra", category: "cook", phone: "9012345678", email: "alok@kitchen.net",
    address: "Ameerpet, Hyderabad", pincode: "500016", location: { lat: 17.4375, lng: 78.4483 }
  },
  {
    name: "Neha Sahu", category: "tutor", phone: "9123456789", email: "neha@tuition.edu",
    address: "Civil Lines, Nagpur", pincode: "440001", location: { lat: 21.1498, lng: 79.0806 }
  },
  {
    name: "Sunita Verma", category: "maid", phone: "9834567890", email: "sunita@domestic.org",
    address: "Ashok Nagar, Ranchi", pincode: "834002", location: { lat: 23.3441, lng: 85.3096 }
  },
  {
    name: "Amit Thakur", category: "cook", phone: "9823456780", email: "amit@cookchef.in",
    address: "Connaught Place, Delhi", pincode: "110001", location: { lat: 28.6315, lng: 77.2167 }
  },
  {
    name: "Divya Joshi", category: "tutor", phone: "9811122233", email: "divya@eduhelp.com",
    address: "Sector 62, Noida", pincode: "201301", location: { lat: 28.6108, lng: 77.3703 }
  }
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Worker.deleteMany(); // Clear previous data
    const result = await Worker.insertMany(workers);
    console.log(`${result.length} workers inserted.`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

seed();
