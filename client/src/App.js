import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CitySelection from "./components/CitySelection";
import VehicleSelection from "./components/VehicleSelection";
import ResultPage from "./components/ResultPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/city-selection" element={<CitySelection />} />
        <Route path="/vehicle-selection" element={<VehicleSelection />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
