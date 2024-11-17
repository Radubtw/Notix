'use client';

import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Link from 'next/link';

import menu from "./menu"

import './orar.css';

const Orar: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleMenuClick = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="orar-container">
      <h1>Orarul Elevului</h1>
      <button className="menu-btn" onClick={handleMenuClick}>Meniu</button>
      <div className="image-section">
        {image ? (
          <div className="image-container">
            <img src={image} alt="Uploaded" className="uploaded-image" />
            <button onClick={handleImageRemove} className="button remove-button">
              Șterge Poza
            </button>
          </div>
        ) : (
          <div className="upload-container">
            <input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: 'none' }} 
              onChange={handleImageUpload} 
            />
            <button
              onClick={() => document.getElementById('file-input')?.click()} 
              className="button upload-button"
            >
              Încarcă Poza
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orar;
