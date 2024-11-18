'use client'

import React from 'react';
import './manage.css';

import { useNavigate } from 'react-router-dom';

const Manage: React.FC = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/addstudent');
  };

  const handleProfClick = () => {
    navigate('/addprof');
  };

  const handleSubjectClick = () => {
    navigate('/addsubject');
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="manage-button"onClick={handleProfClick}>Adaugă profesori</button>
        <button className="manage-button"onClick={handleSubjectClick}>Adaugă materie</button>
        <button className="manage-button"onClick={handleStudentClick}>Adaugă elevi</button>
      </div>
    </div>
  );
};

export default Manage;
