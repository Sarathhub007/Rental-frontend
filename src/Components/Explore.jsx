import React from 'react';
import { useParams } from 'react-router-dom';
import './Explore.css';

function Explore() {
  const { propertyId } = useParams();
  const propertyDetails = [
    { 
      id: 1, 
      name: "Greenfield Residential Plot", 
      location: "Hyderabad", 
      type: "Land", 
      size: "2400 sq ft", 
      price: "$500,000", 
      rental: "N/A", 
      description: "A spacious residential plot located in a serene and green environment, perfect for building your dream home.",
      owner: { name: "Rajesh Kumar", contact: "9876543210", email: "rajesh.kumar@example.com" }
    },
    { 
      id: 2, 
      name: "Modern Duplex Villa", 
      location: "Bangalore", 
      type: "Villa", 
      size: "3000 sq ft", 
      price: "$600,000", 
      rental: "$2,000/month", 
      description: "A luxurious duplex villa with modern amenities and ample space, ideal for families.",
      owner: { name: "Anita Sharma", contact: "8765432109", email: "anita.sharma@example.com" }
    },
    { 
      id: 3, 
      name: "Luxury Smart Home", 
      location: "Mumbai", 
      type: "Smart Home", 
      size: "3500 sq ft", 
      price: "$700,000", 
      rental: "$3,000/month", 
      description: "Experience modern living with a smart home equipped with cutting-edge technology.",
      owner: { name: "Vikram Singh", contact: "7654321098", email: "vikram.singh@example.com" }
    },
    { 
      id: 4, 
      name: "Panoramic Farmhouse Plot", 
      location: "Chennai", 
      type: "Farm Land", 
      size: "4000 sq ft", 
      price: "$800,000", 
      rental: "N/A", 
      description: "A scenic plot for building your dream farmhouse, located in a peaceful area away from the city.",
      owner: { name: "Priya Menon", contact: "6543210987", email: "priya.menon@example.com" }
    },
    { 
      id: 5, 
      name: "Urban Family Villa", 
      location: "", 
      type: "Villa", 
      size: "2800 sq ft", 
      price: "$900,000", 
      rental: "$2,500/month", 
      description: "A modern villa in the heart of the city, providing the perfect balance of comfort and convenience.",
      owner: { name: "Rohan Das", contact: "5432109876", email: "rohan.das@example.com" }
    },
    { 
      id: 6, 
      name: "Prime Residential Plot", 
      location: "Godavari", 
      type: "Land", 
      size: "2000 sq ft", 
      price: "$1,000,000", 
      rental: "N/A", 
      description: "Premium plot located in a prime residential area with excellent connectivity to key locations.",
      owner: { name: "Sunita Reddy", contact: "4321098765", email: "sunita.reddy@example.com" }
    },
    { 
      id: 7, 
      name: "Eco-Friendly Community Villa", 
      location: "Kerala", 
      type: "Villa", 
      size: "3200 sq ft", 
      price: "$1,100,000", 
      rental: "$3,500/month", 
      description: "A spacious eco-friendly villa with a community feel, surrounded by lush greenery.",
      owner: { name: "Manoj Nair", contact: "3210987654", email: "manoj.nair@example.com" }
    },
    { 
      id: 8, 
      name: "Luxury Residential Bungalow", 
      location: "Goa", 
      type: "Bungalow", 
      size: "3600 sq ft", 
      price: "$1,200,000", 
      rental: "$4,000/month", 
      description: "A premium bungalow offering luxurious living, just a stone's throw from the beach.",
      owner: { name: "Seema Patil", contact: "2109876543", email: "seema.patil@example.com" }
    },
    { 
      id: 9, 
      name: "Riverside Agricultural Plot", 
      location: "Ahmedabad", 
      type: "Farm Land", 
      size: "5000 sq ft", 
      price: "$1,300,000", 
      rental: "N/A", 
      description: "A fertile agricultural plot located along a scenic riverside, ideal for farming or investment.",
      owner: { name: "Harish Mehta", contact: "1098765432", email: "harish.mehta@example.com" }
    },
    { 
      id: 10, 
      name: "Commercial Land Parcel", 
      location: "Vijaywada", 
      type: "Commercial Land", 
      size: "6000 sq ft", 
      price: "$1,400,000", 
      rental: "N/A", 
      description: "Strategically located commercial land, perfect for setting up a business or investment.",
      owner: { name: "Lalita Jain", contact: "0987654321", email: "lalita.jain@example.com" }
    },
    { 
      id: 11, 
      name: "Palm Grove Villa", 
      location: "Guntur", 
      type: "Villa", 
      size: "4000 sq ft", 
      price: "$1,500,000", 
      rental: "$5,000/month", 
      description: "A beautiful villa surrounded by palm trees, offering a tranquil lifestyle.",
      owner: { name: "Ajay Kumar", contact: "9876501234", email: "ajay.kumar@example.com" }
    },
    { 
      id: 12, 
      name: "Hilltop Luxury Estate", 
      location: "Nellore", 
      type: "Estate", 
      size: "7000 sq ft", 
      price: "$1,600,000", 
      rental: "$6,000/month", 
      description: "A majestic hilltop estate offering breathtaking views and luxurious amenities.",
      owner: { name: "Neha Kapoor", contact: "8765401234", email: "neha.kapoor@example.com" }
    }
  ];

  const property = propertyDetails.find((prop) => prop.id === parseInt(propertyId));

  return (
    <div className="explore-page">
      <h1>Explore Property Details</h1>
      {property ? (
        <div className="property-details">
          <h2>{property.name}</h2>
          <p><span>Location:</span> {property.location}</p>
          <p><span>Type:</span> {property.type}</p>
          <p><span>Size:</span> {property.size}</p>
          <p><span>Price:</span> {property.price}</p>
          <p><span>Rental:</span> {property.rental}</p>
          <p><span>Owner:</span> {property.owner.name}</p>
          <p><span>Contact:</span> {property.owner.contact}</p>
          <p><span>Email:</span> {property.owner.email}</p>
        </div>
      ) : (
        <p className="not-found">Property not found</p>
      )}
    </div>
  );
}

export default Explore;
