'use client';

import React from 'react';
import './menuprof.css';

import { useNavigate } from 'react-router-dom';

const MenuProf: React.FC = () => {
  const navigate = useNavigate();

  const handleAddGradesClick = () => {
    navigate('/addgrades');
  };

  const handleAddAbsencesClick = () => {
    navigate('/addabsente');
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="menu-button" onClick={handleAddGradesClick}>Adaugă note</button>
        <button className="menu-button" onClick={handleAddAbsencesClick}>Adaugă absențe</button>
      </div>
    </div>
  );
};

export default MenuProf;
