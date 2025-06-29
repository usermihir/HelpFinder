import React, { useState } from 'react';
import axios from 'axios';
import './CreateProfile.css';

function CreateProfile() {
  const [form, setForm] = useState({
    category: '',
    phone: '',
    pincode: '',
    experience: '',
    image: '',
    idProof: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [idFile, setIdFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === 'image') setImageFile(e.target.files[0]);
    else setIdFile(e.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'your_preset_name'); // replace
    const res = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', data); // replace
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;
      let idProofUrl = form.idProof;

      if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
      if (idFile) idProofUrl = await uploadToCloudinary(idFile);

      const workerId = JSON.parse(localStorage.getItem('user'))?.id;

      const res = await axios.put(`http://localhost:5000/api/worker/${workerId}/profile`, {
        ...form,
        image: imageUrl,
        idProof: idProofUrl,
      });

      if (res.data.success) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error while updating profile');
    }
  };

  return (
    <div className="profile-form-container">
      <h2>Create Your Worker Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="maid">Maid</option>
          <option value="cook">Cook</option>
          <option value="tutor">Tutor</option>
          <option value="electrician">Electrician</option>
        </select>

        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (in years)" value={form.experience} onChange={handleChange} />

        <label>Upload Profile Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
        
        <label>Upload ID Proof</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'id')} />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default CreateProfile;
