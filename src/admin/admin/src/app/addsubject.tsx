'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './addsubject.css';

const AddSubject: React.FC = () => {
  const [subjectData, setSubjectData] = useState({
    numeMaterie: '',
    numeProfesor: '',
    clasa: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele materiei:', subjectData);
    setSubjectData({
      numeMaterie: '',
      numeProfesor: '',
      clasa: '',
    });
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Formular Materie</h2>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-group">
          <label htmlFor="numeMaterie">Nume Materie</label>
          <input
            type="text"
            id="numeMaterie"
            name="numeMaterie"
            value={subjectData.numeMaterie}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeProfesor">Nume Profesor</label>
          <input
            type="text"
            id="numeProfesor"
            name="numeProfesor"
            value={subjectData.numeProfesor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clasa">Clasa</label>
          <input
            type="text"
            id="clasa"
            name="clasa"
            value={subjectData.clasa}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Trimite</button>
      </form>
    </div>
  );
};

export default AddSubject;
