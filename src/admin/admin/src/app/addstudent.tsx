'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addstudent.css';

const AddStudent: React.FC = () => {
  const [courses, setCourses] = useState<{ _id: string; name: string }[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [studentData, setStudentData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    year: '',
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses/list');
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'courses') {
      if (checked) {
        setSelectedCourses([...selectedCourses, value]);
      } else {
        setSelectedCourses(selectedCourses.filter((course) => course !== value));
      }
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStudentData = {
      ...studentData,
      courses: selectedCourses,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/students/add', newStudentData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.success) {
        alert('Student added successfully!');
        navigate('/');
      } else {
        alert('Failed to add student: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Check the console for more details.');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="form-container">
      <h2>Adaugă Student</h2>
      <button className="back-btn" onClick={() => navigate('/')}>
        Meniu
      </button>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Nume</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
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
            value={studentData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Data Nașterii</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={studentData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">An</label>
          <input
            type="number"
            id="year"
            name="year"
            value={studentData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courses">Cursuri</label>
          <button type="button" onClick={toggleModal} className="select-courses-btn">
            Selectează Cursuri
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentData.email}
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
            value={studentData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Trimite
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Selectează Cursuri</h2>
            <form>
              {courses.map((course) => (
                <div key={course._id} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`course-${course._id}`}
                    name="courses"
                    value={course._id}
                    checked={selectedCourses.includes(course._id)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`course-${course._id}`}>{course.name}</label>
                </div>
              ))}
            </form>
            <button onClick={toggleModal} className="close-modal-btn">Închide</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
