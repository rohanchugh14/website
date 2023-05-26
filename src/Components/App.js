import React from "react";
// import Navbar from "./Navbar";
import "../CSS/App.scss";
import Scraper from "./Scraper";
import Simulator from "./Simulator";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scraper" element={<Scraper />} />
        <Route path="/simulator" element={<Simulator />} />
      </Routes>
      {/* <Navbar /> */}
      {/* <Scraper />
       */}
    </Router>
  );
};

export default App;
