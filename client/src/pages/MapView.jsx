import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


function MapView({ workers }) {
    const [selectedDate, setSelectedDate] = useState('');

  const handleBooking = async (worker) => {
  const userId = 'guest'; // replace with actual logged-in user ID if available
const date = selectedDate || new Date().toISOString(); // fallback to now if not selected
  const status = 'pending';



  try {
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workerId: worker.id,
        userId,
        date,
        status
      }),
    });

    const data = await res.json();
    alert('Booking Successful!');
    console.log('Booking response:', data);
  } catch (err) {
    console.error('Booking failed', err);
    alert('Booking failed.');
  }
};

  return (
    <MapContainer center={[20.5, 85.8]} zoom={7} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     {workers
  .filter(worker => worker.location && worker.location.lat && worker.location.lng)
  .map((worker, idx) => (
    <Marker key={idx} position={[worker.location.lat, worker.location.lng]}>
     <Popup>
  <strong>{worker.name}</strong><br />
  {worker.type} — {worker.experience} yrs<br />
  📞 {worker.phone}
  <br />
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    style={{ marginTop: '8px', padding: '5px' }}
  />
  <br />
  <button
    style={{ marginTop: '8px', padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
    onClick={() => handleBooking(worker)}
  >
    Book Now
  </button>
</Popup>


    </Marker>
))}

    </MapContainer>
  );
}

export default MapView;
