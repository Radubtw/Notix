'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './addstudent.css';


const AddStudent: React.FC = () => {
  const [studentData, setStudentData] = useState({
    nume: '',
    prenume: '',
    dataNasterii: '',
    clasa: '',
    materii: [] as string[],
  });

  const [showMateriiForm, setShowMateriiForm] = useState(false);
  const availableMaterii = ['Matematică', 'Informatică', 'Biologie', 'Fizică', 'Chimie', 'Istorie', 'Geografie','Edicație Fizică','Lb. Franceză', 'Lb. Engleză', 'Lb. Română'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleMateriiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setStudentData({
        ...studentData,
        materii: [...studentData.materii, value],
      });
    } else {
      setStudentData({
        ...studentData,
        materii: studentData.materii.filter(materie => materie !== value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele studentului:', studentData);
    setStudentData({
      nume: '',
      prenume: '',
      dataNasterii: '',
      clasa: '',
      materii: [],
    });
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  const toggleMateriiForm = () => {
    setShowMateriiForm(!showMateriiForm);
  };

  return (
    <div className="form-container">
      <h2>Datele studentului</h2>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="nume">Nume</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={studentData.nume}
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
            value={studentData.prenume}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNasterii">Data Nașterii</label>
          <input
            type="date"
            id="dataNasterii"
            name="dataNasterii"
            value={studentData.dataNasterii}
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
            value={studentData.clasa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="materii">Selectează Materii</label>
          <button type="button" onClick={toggleMateriiForm} className="materii-btn">Alege Materii</button>
        </div>

        <button type="submit" className="submit-btn">Trimite</button>
      </form>

      {showMateriiForm && (
        <div className="overlay">
          <div className="materii-modal">
            <h3>Materii Disponibile</h3>
            {availableMaterii.map((materie, index) => (
              <div key={index} className="checkbox-group">
                <input
                  type="checkbox"
                  id={materie}
                  value={materie}
                  onChange={handleMateriiChange}
                  checked={studentData.materii.includes(materie)}
                />
                <label htmlFor={materie}>{materie}</label>
              </div>
            ))}
            <button type="button" onClick={toggleMateriiForm} className="close-btn">Închide</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
