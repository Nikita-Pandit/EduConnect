import React from 'react'
import SignUp from './Pages/SignUp'
// import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Login from './Pages/Login'

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
   </Router>
  )
}

export default App
