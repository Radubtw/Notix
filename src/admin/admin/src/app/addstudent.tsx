// pages/student.tsx
import React, { useState } from 'react';
import './addstudent.css';

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    nume: '',
    prenume: '',
    dataNasterii: '',
    clasa: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datele studentului:', studentData);
    // Aici poți adăuga logica pentru trimiterea datelor la server
  };

  return (
    <div className="form-container">
      <h2>Formular Student</h2>
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

        <button type="submit" className="submit-btn">Trimite</button>
      </form>
    </div>
  );
};

export default AddStudent;
