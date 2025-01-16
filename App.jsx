import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

import VideoDetail from "./VideoDetail";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-500 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">Mohit's Ganduo</h1>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
