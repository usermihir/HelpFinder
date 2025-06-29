import React, { useState, useEffect } from 'react';

function EditWorkerProfile() {
  const [profile, setProfile] = useState({
    phone: '',
    address: '',
    experience: '',
    availableDates: '',
    lat: '',
    lng: ''
  });

  useEffect(() => {
    // Normally fetched using workerId
    const dummyProfile = {
      phone: '9876543210',
      address: 'Bhubaneswar',
      experience: 4,
      availableDates: ['2025-06-24'],
      location: { lat: 20.2961, lng: 85.8245 }
    };

    setProfile({
      phone: dummyProfile.phone,
      address: dummyProfile.address,
      experience: dummyProfile.experience,
      availableDates: dummyProfile.availableDates.join(','),
      lat: dummyProfile.location.lat,
      lng: dummyProfile.location.lng
    });
  }, []);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can POST/PATCH to backend here
    console.log("Updated Profile:", profile);
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
        <input name="experience" type="number" value={profile.experience} onChange={handleChange} placeholder="Experience (years)" />
        <input name="availableDates" value={profile.availableDates} onChange={handleChange} placeholder="Available Dates (comma separated)" />
        <input name="lat" type="number" step="any" value={profile.lat} onChange={handleChange} placeholder="Latitude" />
        <input name="lng" type="number" step="any" value={profile.lng} onChange={handleChange} placeholder="Longitude" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditWorkerProfile;
