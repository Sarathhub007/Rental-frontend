import React from 'react';
import './Home.css';

import img1 from './img 1.jpg';
import img2 from './img 2.jpg';
import img3 from './img 3.jpg';
import img4 from './img 4.jpg';
import img5 from './img 5.jpg';
import img6 from './img 6.jpg';
import img7 from './img 7.jpg';
import img8 from './img 8.jpg';

function Home() {
  const properties = [
    { id: 1, imgSrc: img1, price: '$500,000' },
    { id: 2, imgSrc: img2, price: '$600,000' },
    { id: 3, imgSrc: img3, price: '$700,000' },
    { id: 4, imgSrc: img4, price: '$800,000' },
    { id: 5, imgSrc: img5, price: '$900,000' },
    { id: 6, imgSrc: img6, price: '$1,000,000' },
    { id: 7, imgSrc: img7, price: '$1,100,000' },
    { id: 8, imgSrc: img8, price: '$1,200,000' },
  ];

  return (
    <div>
      
        

      <section className="welcome-section">
        <h2>Welcome to Our Property Platform</h2>
        <p>Find your dream home!</p>
        <a href="/explore">
          <button>Explore Properties</button>
        </a>
      </section>

      <section className="featured-section">
        <h2>Featured Properties</h2>
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <img src={property.imgSrc} alt={`Property ${property.id}`} />
              <h3>Property {property.id}</h3>
              <p>{property.price}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 PropertySales. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
