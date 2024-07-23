import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import SignUp from './components/SignUp';
import Assessments from './components/Assessments'
import './App.css'
import Header from './components/Header';
import Form from './components/Form'

function App(){
  return (
    <div className="app-container">
      <Header/>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
             <Route path="/addAssessment" element={<Form />} />
          </Routes>
    </div>
  )
  
}

export default App

