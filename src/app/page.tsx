'use client'
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import dynamic from 'next/dynamic';


import Menu from "../components/menu";
import Materii from "../components/materii";
import Orar from "../components/orar";
import Login from "../components/login";
import Grades from "../components/grades";
import Gpa from "../components/gpa";
import Absente from "../components/absente";

const Router = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });


export default function Home() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/materii" element={<Materii />} />
          <Route path="/orar" element={<Orar />} />
          <Route path="/grades" element={<Grades />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/gpa" element={<Gpa />}/>
          <Route path="/absente" element={<Absente />}/>
        </Routes>
      </div>
    </Router>
  );
}
