import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import AdminPage from './pages/adminPage.jsx';
import AsPage from './pages/asPage.jsx';
import UserPage from './pages/userPage.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className='titulo'>Asistencia Social UBB</h1>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/as" element={<AsPage/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
