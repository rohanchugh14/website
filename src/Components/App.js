import { Card } from "@themesberg/react-bootstrap";
import React from "react";
import Navbar from "./Navbar";
import "../CSS/App.css";
import Scraper from "./Scraper";

const App = () => {
  return (
    <div>
      <Navbar />
        <Scraper />
    </div>
  )
}

export default App