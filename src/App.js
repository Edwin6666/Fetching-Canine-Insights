import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import DogList from "./components/DogList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/list" element={<DogList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
