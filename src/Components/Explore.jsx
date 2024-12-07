import React from 'react';
import './Explore.css';

function Explore() {
  const landDetails = [
    { id: 1, name: "Krishna Riverside Plot", location: "Vijayawada", size: "2000 sq ft", price: "₹5,000,000" },
    { id: 2, name: "Eco-Friendly Farm", location: "Chinna Kanchikacherla", size: "1500 sq ft", price: "₹3,800,000" },
    { id: 3, name: "Vijayawada Hill View", location: "Gunadala", size: "2500 sq ft", price: "₹6,500,000" },
    { id: 4, name: "City Center Land", location: "Kotha Kota", size: "1800 sq ft", price: "₹4,500,000" },
    { id: 5, name: "Lakeside Residential Plot", location: "Undavalli", size: "2200 sq ft", price: "₹7,200,000" },
    { id: 6, name: "Heritage Farm Land", location: "Jakkampudi", size: "2100 sq ft", price: "₹2,900,000" },
    { id: 7, name: "Peaceful Retreat", location: "Nandigama", size: "1700 sq ft", price: "₹3,500,000" },
    { id: 8, name: "Urban Development Site", location: "Mangalagiri", size: "1600 sq ft", price: "₹5,600,000" },
  ];

  return (
    <div className="explore-page">
      <h1>Explore Land Properties Near Vijayawada</h1>
      <div className="land-grid">
        {landDetails.map((land) => (
          <div className="land-card" key={land.id}>
            <h2>{land.name}</h2>
            <p><span>Location:</span> {land.location}</p>
            <p><span>Size:</span> {land.size}</p>
            <p><span>Price:</span> {land.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
