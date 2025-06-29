import React, { useState, useEffect } from 'react';
import './TestimonialCarousel.css';

const testimonials = [
  {
    name: "Ananya Sharma",
    comment: "I found a wonderful tutor for my child through this platform. The process was smooth and secure!",
    role: "Parent from Bhubaneswar",
    image: "/images/ananya.png"
  },
  {
    name: "Ravi Das",
    comment: "I got a job within two days of registering as a cook. Thanks to HelpFinder!",
    role: "Cook from Cuttack",
    image: "/images/ravi.png"
  },
  {
    name: "Priya Menon",
    comment: "Verified Help Finder helped me find a reliable maid in a new city. Absolute lifesaver!",
    role: "Working Professional in Pune",
    image: "/images/priya.png"
  },
  {
    name: "Suresh Kumar",
    comment: "I work as an electrician and this platform keeps giving me new clients every week!",
    role: "Worker from Balasore",
    image: "/images/suresh.png"
  }
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % testimonials.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [index]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const { name, comment, role, image } = testimonials[index];

  return (
    <div className="testimonial-carousel-full">
      <div
        className="testimonial-slide"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="overlay">
          <div className="testimonial-content">
            <p className="comment">“{comment}”</p>
            <p className="name">— {name}</p>
            <p className="role">{role}</p>
          </div>
        </div>

        <button className="arrow left" onClick={prevSlide}>&#8592;</button>
        <button className="arrow right" onClick={nextSlide}>&#8594;</button>
      </div>

      <div className="dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;
