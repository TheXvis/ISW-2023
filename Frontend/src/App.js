import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import AdminPage from './pages/adminPage.jsx';
import AsPage from './pages/asPage.jsx';
import UserPage from './pages/userPage.jsx';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#333333", color: "#fff", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}> 
        <div className="App" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/as" element={<AsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
