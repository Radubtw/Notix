'use client';

import React from 'react';
import './materii.css';

import { useNavigate } from 'react-router-dom';

interface Materie {
  materie: string;
  profesor: string;
}

const Materii: React.FC = () => {
  const materii: Materie[] = [
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

  const navigate = useNavigate();

  const handleGradesClick = () => {
    navigate('/grades');
  };

  return (
    <div className="materii-container">
      <h1>Materiile elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>Meniu</button>

      {materii.length === 0 ? (
        <div className="no-materii-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="materii-cards">
          {materii.map((item, index) => (
            <div key={index} className="card">
              <h2>{item.materie}</h2>
              <p className="profesor">Prof. {item.profesor}</p>
              <button className="view-button" onClick={handleGradesClick}>Vizualizare note</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materii;
