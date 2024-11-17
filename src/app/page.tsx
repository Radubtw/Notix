'use client'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "../components/menu";
import Materii from "../components/materii";
import Orar from "../components/orar";
import Login from "../components/login";

export default function Home() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/materii" element={<Materii />} />
          <Route path="/orar" element={<Orar />} />
        </Routes>
      </div>
    </Router>
  );
}
