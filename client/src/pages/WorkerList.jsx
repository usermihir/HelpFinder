import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WorkerList.css';
import MapView from './MapView';
import { useLocation } from "react-router-dom";

function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [location, setLocation] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const locationHook = useLocation(); // fixed naming
  const queryParams = new URLSearchParams(locationHook.search);
  const typeFilterFromURL = queryParams.get("type"); 

  useEffect(() => {
    if (typeFilterFromURL) {
      setFilter(typeFilterFromURL);
    }
  }, [typeFilterFromURL]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/workers');
        const data = await res.json();
        if (data.success) {
          setWorkers(data.workers);
        } else {
          console.error("Failed to load workers:", data.message);
        }
      } catch (err) {
        console.error('Failed to fetch workers', err);
      }
    };

    fetchWorkers();
  }, []);

  let filteredWorkers = workers.filter((w) => {
    const matchType = filter ? w.category?.toLowerCase() === filter.toLowerCase() : true;
    const matchName = w.name.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location ? w.address.toLowerCase().includes(location.toLowerCase()) : true;
    const matchExperience = minExperience ? w.experience >= parseInt(minExperience) : true;
    const matchDate = dateFilter
      ? w.availableDates && w.availableDates.includes(dateFilter)
      : true;
    return matchType && matchName && matchLocation && matchExperience && matchDate;
  });

  if (sortOrder === 'asc') {
    filteredWorkers.sort((a, b) => a.experience - b.experience);
  } else if (sortOrder === 'desc') {
    filteredWorkers.sort((a, b) => b.experience - a.experience);
  }

  return (
    <div className="worker-list-container">
      <h2 className="worker-title">Verified Workers</h2>

      {/* Filter + Search */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="maid">Maid</option>
          <option value="cook">Cook</option>
          <option value="tutor">Tutor</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Experience</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Experience (years)"
          value={minExperience}
          onChange={(e) => setMinExperience(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Worker Cards */}
      <ul className="worker-list">
        {filteredWorkers.map((worker, index) => (
          <li key={index} className="worker-card">
              <Link to={`/user/profile/${worker._id}`}>
              <h4>{worker.name} ({worker.category})</h4>
              <p><strong>Email:</strong> {worker.email}</p>
              <p><strong>Address:</strong> {worker.address}</p>
              <p><strong>Experience:</strong> {worker.experience || 0} years</p>
            </Link>
          </li>
        ))}
      </ul>

      {filteredWorkers.length > 0 && <MapView workers={filteredWorkers} />}
    </div>
  );
}

export default WorkerList;
