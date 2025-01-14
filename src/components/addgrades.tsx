'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import './addgrades.css';

interface Materie
{
  _id: string;
  name: string;
  year: number;
}

interface Student
{
  _id: string;
  name: string;
  surname: string;
}

const AddGrades: React.FC = () => {
  const [gradeData, setGradeData] = useState({
    materia: '',
    student: '',
    nota: '',
  });
  const [studenti, setStudenti] = useState<Student[]>([]);
  const [materii, setMaterii] = useState<Materie[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

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
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/courses/list',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("materii:", response.data.courses);
        setMaterii(response.data.courses as Materie[])
      }
      catch(error){
        console.error('Error fetching courses', error);
      }
  };
  fetchStudentCourses();
  }, [])

  const handleChangeCourse = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setGradeData({
      ...gradeData,
      [name]: value,
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
  

  const handleChangeStudent = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setGradeData({
      ...gradeData,
      [name]: value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setGradeData({
      ...gradeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { materia, student, nota } = gradeData;
  
    if (!materia || !student || !nota) {
      alert('Toate câmpurile sunt obligatorii!');
      return;
    }
  
    const markData = {
      courseId: materia,
      studentId: student,
      mark: parseInt(nota, 10),
      date: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post(
        'http://localhost:3001/api/marks/add',
        markData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.success) {
        alert('Nota a fost adăugată cu succes!');
        setGradeData({
          materia: '',
          student: '',
          nota: '',
        });
        setStudenti([]);
      } else {
        console.error('Error adding mark:', response.data.message);
        alert('Eroare la adăugarea notei!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A apărut o eroare la salvarea notei!');
    }
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
          <select
            id="materia"
            name="materia"
            value={gradeData.materia}
            onChange={handleChangeCourse}
            required
            className="rounded-md text-black py-2"
          >
            <option value="">Selectează materia</option>
            {materii.map((materie, index) => (
              <option key={index} value={materie._id}>
                {materie.name + " " + materie.year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="student">Nume și Prenume Student</label>
          <select
            id="student"
            name="student"
            value={gradeData.student}
            onChange={handleChangeStudent}
            required
            className="rounded-md text-black py-2"
          >
            <option value="">Selectează studentul</option>
            {studenti.map((student, index) => (
              <option key={index} value={student._id}>
                {student.name + " " + student.surname}
              </option>
            ))}
          </select>
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
