'use client';

import React, { useEffect, useState } from 'react';
import './grades.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Grade {
  mark: number;
  date: string;
}

const Grades: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');

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
    if (userId && courseId) {
      const fetchGrades = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/api/marks/list',
            { courseId, userId },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (response.data) {
            console.log(response.data);
            setGrades(response.data.marks as Grade[]);
            setGrades(prevGrades =>
              prevGrades.map(grade => ({
                ...grade,
                date: formatDate(grade.date),
              }))
            );
          } else {
            console.error('Grades data is not available or not an array');
            setGrades([]);
          }
        } catch (error) {
          console.error('Error fetching grades:', error);
        }
      };

      fetchGrades();
    }
  }, [userId, courseId]);

    const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleMateriiClick = () => {
    navigate('/materii');
  };

  return (
    <div className="grades-container">
      <h1>Notele elevului</h1>
      <button className="back-btn" onClick={handleMateriiClick}>
        Înapoi
      </button>

      {grades.length === 0 ? (
        <div className="no-grades-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="grades-cards">
          {grades.map((grade, index) => (
            <div key={index} className="grade-card">
              <h2>Nota</h2>
              <div className="grade-number">{grade.mark}</div>
              <p className="date">{grade.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grades;
