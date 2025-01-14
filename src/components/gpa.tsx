'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './gpa.css';

interface Materie {
  _id: string;
  name: string;
}

const Gpa: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [materii, setMaterii] = useState<Materie[]>([]);
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [averages, setAverages] = useState<{ [courseId: string]: number }>({});

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

          setCourseIds(response.data.courses as string[]);
        } catch (error) {
          console.error('Error fetching courses', error);
        }
      };

      fetchCourses();
    }
  }, [userId]);

  useEffect(() => {
    if (courseIds.length > 0) {
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

          setMaterii(response.data.courses as Materie[]);
        } catch (error) {
          console.error('Error fetching courses', error);
        }
      };

      fetchStudentCourses();
    }
  }, [courseIds]);

  useEffect(() => {
    if (courseIds.length > 0) {
      const fetchAverages = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/api/marks/listAverage',
            { courseIds,
              userId
             },
            { headers: { 'Content-Type': 'application/json' } }
          );
          const averagesMap = response.data.averages.reduce(
            (acc: { [key: string]: number }, item: { _id: string; averageMark: number }) => {
              acc[item._id] = item.averageMark;
              return acc;
            },
            {}
          );
          setAverages(averagesMap);
        } catch (error) {
          console.error('Error fetching averages', error);
        }
      };

      fetchAverages();
    }
  }, [courseIds]);

  const calculeazaMediaGenerala = (): number => {
    const totalAverages = Object.values(averages).reduce((acc, avg) => acc + avg, 0);
    return materii.length > 0 ? totalAverages / materii.length : 0;
  };

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  return (
    <div className="gpa-container">
      <h1>Media elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>
        Meniu
      </button>
      <div className="gpa-cards">
        {materii.map((materie) => {
          const average = averages[materie._id] || 0;
          return (
            <div key={materie._id} className="card">
              <h2>{materie.name}</h2>
              <div className="media">
                <p>Medie: {average.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="media-generala">
        <h3>Media Generală</h3>
        <p>{calculeazaMediaGenerala().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Gpa;
