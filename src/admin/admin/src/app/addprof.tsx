'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './addprof.css';

const AddProf: React.FC = () => {
  const [profData, setProfData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfData({
      ...profData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/professors/add', profData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Profesor adăugat cu succes!');
        setProfData({
          name: '',
          surname: '',
          email: '',
          password: '',
        });
      } else {
        alert(`Eroare: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error adding professor:', error);
      alert('A apărut o eroare la adăugarea profesorului.');
    }
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Datele profesorului</h2>
      <button className="back-btn" onClick={handleMenuClick}>
        Meniu
      </button>
      <form onSubmit={handleSubmit} className="prof-form">
        <div className="form-group">
          <label htmlFor="name">Nume</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Prenume</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={profData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Parolă</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Trimite
        </button>
      </form>
    </div>
  );
};

export default AddProf;
