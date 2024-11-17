'use client'
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import dynamic from 'next/dynamic';


import Menu from "../components/menu";
import Materii from "../components/materii";
import Orar from "../components/orar";
import Login from "../components/login";
import Grades from "../components/grades";

const Router = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });


export default function Home() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/materii" element={<Materii />} />
          <Route path="/orar" element={<Orar />} />
          <Route path="/grades" element={<Grades />}/>
        </Routes>
      </div>
    </Router>
  );
}
