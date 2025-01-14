'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './addabsente.css';

interface Materie {
  _id: string;
  name: string;
  year: number;
}

interface Student {
  _id: string;
  name: string;
  surname: string;
}

const AddAbsente: React.FC = () => {
  const [studenti, setStudenti] = useState<Student[]>([]);
  const [materii, setMaterii] = useState<Materie[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const [absenceData, setAbsenceData] = useState({
    courseId: '',
    courseName: '',
    studentId: '',
    date: '',
  });

  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true,
    });

    axiosInstance
      .get('http://localhost:3001/api/session/check-session')
      .then((response) => {
        setUserId(response.data.user.id);
      })
      .catch((error) => {
        console.error('Error checking session', error);
      });
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/courses/list',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('materii:', response.data.courses);
        setMaterii(response.data.courses as Materie[]);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };
    fetchCourses();
  }, []);

  const handleChangeCourse = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const selectedCourse = materii.find((course) => course._id === value);

    setAbsenceData({
      ...absenceData,
      courseId: value,
      courseName: selectedCourse ? selectedCourse.name : '',
    });

    if (value) {
      try {
        const response = await axios.post(
          'http://localhost:3001/api/students/listCourseStudents',
          { courseId: value },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Studenți pentru curs:', response.data.students);
        if (response.data.success) {
          setStudenti(response.data.students as Student[]);
        } else {
          console.error('Error fetching students:', response.data.message);
          setStudenti([]);
        }
      } catch (error) {
        console.error('Error fetching students for course:', error);
        setStudenti([]);
      }
    } else {
      setStudenti([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAbsenceData({
      ...absenceData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { courseId, courseName, studentId, date } = absenceData;

    if (!courseId || !courseName || !studentId || !date) {
      alert('Toate câmpurile sunt obligatorii!');
      return;
    }

    const absenceDataPayload = {
      courseId,
      courseName,
      studentId,
      date,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/api/attendence/add',
        absenceDataPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert('Absenta a fost adăugată cu succes!');
        setAbsenceData({
          courseId: '',
          courseName: '',
          studentId: '',
          date: '',
        });
        setStudenti([]);
      } else {
        console.error('Error adding absence:', response.data.message);
        alert('Eroare la adăugarea absenței!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A apărut o eroare la salvarea absenței!');
    }
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menuprof');
  };

  return (
    <div className="form-container">
      <h2>Adaugă absență</h2>
      <button className="back-btn" onClick={handleMenuClick}>
        Meniu
      </button>
      <form onSubmit={handleSubmit} className="grades-form">
        <div className="form-group">
          <label htmlFor="courseId">Materia</label>
          <select
            id="courseId"
            name="courseId"
            value={absenceData.courseId}
            onChange={handleChangeCourse}
            required
            className="rounded-md text-black py-2"
          >
            <option value="">Selectează materia</option>
            {materii.map((materie) => (
              <option key={materie._id} value={materie._id}>
                {materie.name + ' ' + materie.year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="studentId">Nume și Prenume Student</label>
          <select
            id="studentId"
            name="studentId"
            value={absenceData.studentId}
            onChange={handleChange}
            required
            className="rounded-md text-black py-2"
          >
            <option value="">Selectează studentul</option>
            {studenti.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name + ' ' + student.surname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            value={absenceData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Adaugă
        </button>
      </form>
    </div>
  );
};

export default AddAbsente;
