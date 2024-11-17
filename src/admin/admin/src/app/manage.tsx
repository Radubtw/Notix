// pages/manage.tsx

import React from 'react';
import './manage.css';

const Manage = () => {
  return (
    <div className="container">
      <div className="button-container">
        <button className="manage-button">Adaugă profesori</button>
        <button className="manage-button">Adaugă materie</button>
        <button className="manage-button">Adaugă elevi</button>
      </div>
    </div>
  );
};

export default Manage;
