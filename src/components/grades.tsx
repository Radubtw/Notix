'use client';

import React from 'react';
import './grades.css';  

import { useNavigate } from 'react-router-dom';

interface Grade {
  nota: number;
  data: string;
}

const Grades: React.FC = () => {

  const grades: Grade[] = [
    //{ nota: 9, data: '15 Noiembrie 2024' },
    //{ nota: 8, data: '10 Noiembrie 2024' },
    // { nota: 7, data: '5 Noiembrie 2024' },
    // { nota: 10, data: '1 Noiembrie 2024' },
    // { nota: 6, data: '25 Octombrie 2024' },
  ];

  const navigate = useNavigate();

  const handleMateriiClick = () => {
    navigate('/materii');
  };

  return (
    <div className="grades-container">
      <h1>Notele elevului</h1>
      <button className="back-btn" onClick={handleMateriiClick}>Înapoi</button>
      
      {grades.length === 0 ? (
        <div className="no-grades-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="grades-cards">
          {grades.map((grade, index) => (
            <div key={index} className="grade-card">
              <h2>Nota</h2>
              <div className="grade-number">{grade.nota}</div>
              <p className="date">{grade.data}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grades;
