'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './addabsente.css';

const AddAbsente: React.FC = () => {
  const [absenceData, setAbsenceData] = useState({
    materia: '',
    student: '',
    data: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAbsenceData({
      ...absenceData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele absenței:', absenceData);
    setAbsenceData({
      materia: '',
      student: '',
      data: '',
    });
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menuprof');
  };

  return (
    <div className="form-container">
      <h2>Adaugă absența</h2>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      <form onSubmit={handleSubmit} className="absences-form">
        <div className="form-group">
          <label htmlFor="materia">Materia</label>
          <input
            type="text"
            id="materia"
            name="materia"
            value={absenceData.materia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="student">Nume și Prenume Student</label>
          <input
            type="text"
            id="student"
            name="student"
            value={absenceData.student}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            id="data"
            name="data"
            value={absenceData.data}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Adaugă</button>
      </form>
    </div>
  );
};

export default AddAbsente;
