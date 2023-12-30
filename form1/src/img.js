import React, { useState } from 'react';
import lord from '../src/lord/1.jpg';
import lord1 from '../src/lord/2.jpg';
import lord2 from '../src/lord/3.jpg';
import lord3 from '../src/lord/4.jpg';
import lord4 from '../src/lord/5.jpg';
import lord5 from '../src/lord/6.jpg';
import './img.css'; // Import the CSS file

function Img() {
  const images = [lord, lord1, lord2, lord3, lord4, lord5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="img-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide ${index + 1}`}
            className={index === currentIndex ? 'visible' : 'hidden'}
          />
        ))}
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Img;
