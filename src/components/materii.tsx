'use client';

import React, { useEffect, useState } from 'react';
import './materii.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Materie {
  id: string;
  name: string;
  year: string;
  professorName: string;
}

const Materii: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [materii, setMaterii] = useState<Materie[]>([]); // Store fetched courses
  const [courseIds, setCourseIds] = useState<string[]>([]); // Store fetched courses

  const navigate = useNavigate();

  // First useEffect: Check session and get the userId
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
  }, []); // Run only once when the component mounts

  // Second useEffect: Fetch courses when userId is available
  useEffect(() => {
    if (userId) {
      const fetchCourses = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/api/students/getStudentCourses',
            {
              userId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          setCourseIds(response.data.courses as string[]); // Update materii state with the courses

        } catch (error) {
          console.error('Error fetching courses', error);
        }
      };
      
      fetchCourses();
    
    }
  }, [userId]); // Only run when userId changes


  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/api/courses/listStudentCourses',
          {
            courseIds,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("materii:", response.data);
        setMaterii(response.data.courses as Materie[])
      }
      catch(error){
        console.error('Error fetching courses', error);
      }
  };
  fetchStudentCourses();
  }, [courseIds])

  useEffect(() => {
    console.log(materii);
  })
  const handleMenuClick = () => {
    window.location.href = '/';
  };

  const handleGradesClick = () => {
    navigate('/grades');
  };

  return (
    <div className="materii-container">
      <h1>Materiile elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>
        Meniu
      </button>

      {materii.length === 0 ? (
        <div className="no-materii-message">
          <p>Nu există nimic de afișat</p>
        </div>
      ) : (
        <div className="materii-cards">
          {materii.map((item, index) => (
            <div key={index} className="card">
              <h2>{item.name}</h2>
              <p className="profesor">Prof. {item.professorName}</p>
              <button className="view-button" onClick={handleGradesClick}>
                Vizualizare note
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materii;
