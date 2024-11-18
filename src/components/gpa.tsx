'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './gpa.css';

interface Materie {
  materie: string;
  note: number[]; 
}

const Gpa: React.FC = () => {
  const [materii] = useState<Materie[]>([
    { materie: 'Lb. Română', note: [8, 9, 10] },
    { materie: 'Matematică', note: [7, 8, 9] },
    { materie: 'Informatică', note: [9, 9, 10] },
    { materie: 'Educație Fizică', note: [10, 10, 10] },
    { materie: 'Chimie', note: [7, 8, 9] },
    { materie: 'Lb. Franceză', note: [9, 10, 10] },
    { materie: 'Lb. Engleză', note: [8, 7, 8] },
    { materie: 'Istorie', note: [6, 7, 8] },
    { materie: 'Geografie', note: [7, 8, 8] },
  ]);

  const calculeazaMediaMaterie = (note: number[]): number => {
    const total = note.reduce((acc, nota) => acc + nota, 0);
    return total / note.length;
  };

  const calculeazaMediaGenerala = (): number => {
    const totalNotes = materii.reduce((acc, materie) => acc + materie.note.reduce((acc, nota) => acc + nota, 0), 0);
    const totalSubjects = materii.reduce((acc, materie) => acc + materie.note.length, 0);
    return totalNotes / totalSubjects;
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <div className="gpa-container">
      <h1>Media elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>Meniu</button>
      <div className="gpa-cards">
        {materii.map((materie, index) => {
          const mediaMaterie = calculeazaMediaMaterie(materie.note);
          return (
            <div key={index} className="card">
              <h2>{materie.materie}</h2>
              <div className="notes">
                {materie.note.map((nota, i) => (
                  <div key={i} className="note-box">
                    {nota}
                  </div>
                ))}
              </div>
              <div className="media">
                <p>Medie: {mediaMaterie.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="media-generala">
        <h3>Media Generală</h3>
        <p>{calculeazaMediaGenerala().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Gpa;
