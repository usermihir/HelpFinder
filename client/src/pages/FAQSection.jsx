import React, { useState } from 'react';
import './FAQSection.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    question: 'How can I trust a worker listed on your platform?',
    answer: 'All workers undergo a strict verification process including ID proof, address validation, and background checks.',
  },
  {
    question: 'Can I book a worker for a single day or specific hours?',
    answer: 'Yes, you can book workers for one-time tasks or recurring work based on availability shown on their profile.',
  },
  {
    question: 'How are workers matched with user needs?',
    answer: 'You can filter workers by category, location, experience, and availability to find the best match.',
  },
  {
    question: 'What happens after I submit a booking request?',
    answer: 'The worker receives your request and can accept or decline it. You’ll be notified through your dashboard.',
  },
  {
    question: 'Can I cancel a booking after confirming?',
    answer: 'Yes, you can cancel pending bookings from your dashboard. Early notice is encouraged.',
  },
  {
    question: 'Do workers bring their own tools or materials?',
    answer: 'It depends on the job type. It’s best to confirm with the worker before the task.',
  },
  {
    question: 'Is my personal data safe on this platform?',
    answer: 'Yes. We use secure encryption and follow strict privacy policies.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (<>
    <Navbar/>
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => toggle(i)}>
              <span>{item.question}</span>
              <span>{openIndex === i ? '-' : '+'}</span>
            </div>
            {openIndex === i && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default FAQSection;
