import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth"
import Reg from "./pages/Reg"
import Home from "./pages/Home"
import Room from "./pages/Room"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Reg />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
