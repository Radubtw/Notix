'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './addprof.css';

const AddProf: React.FC = () => {
  const [profData, setProfData] = useState({
    nume: '',
    prenume: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfData({
      ...profData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele profesorului:', profData);
    setProfData({
        nume: '',
        prenume: '',
      });
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Datele profesorului</h2>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      <form onSubmit={handleSubmit} className="prof-form">
        <div className="form-group">
          <label htmlFor="nume">Nume</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={profData.nume}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prenume">Prenume</label>
          <input
            type="text"
            id="prenume"
            name="prenume"
            value={profData.prenume}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Trimite</button>
      </form>
    </div>
  );
};

export default AddProf;
