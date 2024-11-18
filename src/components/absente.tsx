'use client';

import React from 'react';
import './absente.css';  

import { useNavigate } from 'react-router-dom';

interface Absenta {
  materie: string;
  data: string;
}

const Absente: React.FC = () => {

  const absente: Absenta[] = [
    { materie: 'Matematică', data: '15 Noiembrie 2024' },
    { materie: 'Istorie', data: '10 Noiembrie 2024' },
    // { materie: 'Fizică', data: '5 Noiembrie 2024' },
    // { materie: 'Chimie', data: '1 Noiembrie 2024' },
    // { materie: 'Română', data: '25 Octombrie 2024' },
  ];

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <div className="absente-container">
      <h1>Absențele elevului</h1>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      
      {absente.length === 0 ? (
        <div className="no-absente-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="absente-cards">
          {absente.map((absenta, index) => (
            <div key={index} className="absenta-card">
              <h2>Absență</h2>
              <div className="materie">{absenta.materie}</div>
              <p className="date">{absenta.data}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Absente;
