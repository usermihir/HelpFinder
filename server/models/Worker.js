import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // maid, cook, etc.
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  pincode: { type: String, required: true },
  experience: { type: Number }, // in years
  available: { type: Boolean, default: true },
  location: {
  lat: { type: Number },
  lng: { type: Number }
  },
  image: { type: String }, // Cloudinary image URL
  idProof: { type: String }, // Cloudinary uploaded ID
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Worker', workerSchema);
