import React from "react";
// import Navbar from "./Navbar";
import "../CSS/App.scss";
import Scraper from "./Scraper";
import Simulator from "./Simulator";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scraper" element={<Scraper />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
    </Router>
      // <Simulator />
  );
};

export default App;
