import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import DogList from "./components/DogList";
import DogCrud from './components/DogCrud/DogCrud';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/list" element={<DogList />} />
          <Route path="/table" element={<DogCrud />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
