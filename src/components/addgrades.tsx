'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './addgrades.css';

const AddGrades: React.FC = () => {
  const [gradeData, setGradeData] = useState({
    materia: '',
    student: '',
    nota: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGradeData({
      ...gradeData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele notei:', gradeData);
    setGradeData({
      materia: '',
      student: '',
      nota: '',
    });
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menuprof');
  };

  return (
    <div className="form-container">
      <h2>Adaugă nota</h2>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      <form onSubmit={handleSubmit} className="grades-form">
        <div className="form-group">
          <label htmlFor="materia">Materia</label>
          <input
            type="text"
            id="materia"
            name="materia"
            value={gradeData.materia}
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
            value={gradeData.student}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nota">Nota</label>
          <input
            type="number"
            id="nota"
            name="nota"
            value={gradeData.nota}
            onChange={handleChange}
            required
            min="1"
            max="10"
          />
        </div>

        <button type="submit" className="submit-btn">Adaugă</button>
      </form>
    </div>
  );
};

export default AddGrades;
