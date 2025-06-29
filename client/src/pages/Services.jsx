import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Services() {
  const services = [
    {
      title: 'Maid',
      desc: 'Trained maids available for cleaning, laundry, and housekeeping tasks.',
      image: '/maid.png',
      path: '/workers?type=maid'
    },
    {
      title: 'Cook',
      desc: 'Hire experienced cooks for daily meals or special occasions.',
      image: '/cook.png',
      path: '/workers?type=cook'
    },
    {
      title: 'Tutor',
      desc: 'Qualified tutors for school, college, and competitive exam preparation.',
      image: '/tutor.png',
      path: '/workers?type=tutor'
    },
    {
      title: 'Electrician',
      desc: 'Certified electricians for repairs, installation and safety checks.',
      image: '/electrician.png',
      path: '/workers?type=electrician'
    },
    {
      title: 'Babysitter',
      desc: 'Trustworthy babysitters to take care of your child while you’re busy.',
      image: '/babysitter.png',
      path: '/workers?type=babysitter'
    },
    {
      title: 'Plumber',
      desc: 'Skilled plumbers available for emergency repairs and fittings.',
      image: '/plumber.png',
      path: '/workers?type=plumber'
    }
  ];

  return (
    <div className="services-page">
        <Navbar />
      <h1 className="page-title">Our Services</h1>
      <p className="page-subtitle">We connect you with verified and skilled domestic helpers at your convenience.</p>

      <div className="services-grid">
        {services.map(service => (
          <Link to={service.path} className="service-card" key={service.title}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Services;
