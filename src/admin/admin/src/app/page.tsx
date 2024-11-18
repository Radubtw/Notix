'use client'
import Image from "next/image";

import { Route, Routes } from 'react-router-dom';

import dynamic from 'next/dynamic';

import Manage from "./manage"
import AddStudent from "./addstudent"
import AddProf from "./addprof"
import AddSubject from "./addsubject"

const Router = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });

export default function Home() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Manage />} />
        <Route path="/addprof" element={<AddProf />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/addsubject" element={<AddSubject />}/>
      </Routes>
    </div>
  </Router>
  );
}
