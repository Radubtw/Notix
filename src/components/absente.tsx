'use client';

import React, { useEffect, useState } from 'react';
import './absente.css';  
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Absenta {
  courseId: string;
  date: Date;
}
interface Course {
  name: string;
  professorName: string;
}

const Absente: React.FC = () => {
  const [absente, setAbsente] = useState<Absenta[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/session/check-session', {
          withCredentials: true,
        });

        const fetchedUserId = response.data.user.id;
        setUserId(fetchedUserId);
        console.log('Fetched userId:', fetchedUserId);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchAbsences = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/api/attendence/list',
            { userId },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (response.data) {
            console.log(response.data);
            setAbsente(response.data.absences as Absenta[]);
          } else {
            console.error('Grades data is not available or not an array');
            setAbsente([]);
          }
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
        console.log("USER ID: ", userId);
      };

      fetchAbsences();
    }
  }, [userId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/api/courses/listCourseByCourseId',
          {
            absente,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("materii:", response.data);
        setCourseIds(response.data.courses as courseIds)
      }
      catch(error){
        console.error('Error fetching courses', error);
      }
  };
  fetchStudentCourses();
  }, [courseIds])

    const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  


  const handleMenuClick = () => {
    navigate('/menu');
  };

  return (
    <div className="absente-container">
      <h1>Absențele elevului</h1>
      <button className="back-btn" onClick={handleMenuClick}>Meniu</button>
      
      {absente.length === 0 ? (
        <div className="no-absente-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="absente-cards">
          {absente.map((absenta, index) => (
            <div key={index} className="absenta-card">
              <h2>Absență</h2>
              <div className="materie">{absenta.courseId}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Absente;
