'use client'; 

import React from 'react';
import './materii.css';

const Materii: React.FC = () => {
  const materii = [
    { materie: 'Lb. Română', profesor: 'Ion Popescu' },
    { materie: 'Matematică', profesor: 'Maria Ionescu' },
    { materie: 'Informatică', profesor: 'George Asavei' },
    { materie: 'Educație Fizică', profesor: 'Elena Vasile' },
    { materie: 'Chimie', profesor: 'Alina Dumitru' },
    { materie: 'Lb. Franceză', profesor: 'Mihaela Caragea' },
    { materie: 'Lb. Engleză', profesor: 'Ion Dinu' },
    { materie: 'Istorie', profesor: 'Radu Constantin' },
    { materie: 'Geografie', profesor: 'Florin Stanciu' },
  ];

  const handleMenuClick = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="materii-container">
      <h1>Materiile elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>Meniu</button>
      <div className="materii-cards">
        {materii.map((item, index) => (
          <div key={index} className="card">
            <h2>{item.materie}</h2>
            <p className="profesor">Prof. {item.profesor}</p>
            <button className="view-button">Vizualizare note</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materii;
